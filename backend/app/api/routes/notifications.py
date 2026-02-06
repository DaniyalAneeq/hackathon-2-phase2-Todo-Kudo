"""
Notification routes for deadline reminders
"""
from datetime import datetime, timedelta
from typing import List, Literal, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select, func

from app.core.database import get_session
from app.models.notification import Notification, NotificationCreate, NotificationResponse
from app.models.task import Task
from app.api.dependencies import get_current_user

router = APIRouter(prefix="/api/notifications", tags=["notifications"])


@router.get("", response_model=dict)
async def list_notifications(
    is_read: Optional[bool] = Query(None),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    session: Session = Depends(get_session),
    user_id_str: str = Depends(get_current_user)
):
    """
    List notifications for the authenticated user

    Query Parameters:
        is_read: Filter by read status (True/False/None for all)
        limit: Maximum number of notifications to return
        offset: Number of notifications to skip

    Returns:
        dict with notifications array, total count, and unread count
    """
    user_id = UUID(user_id_str)

    # Base query
    statement = select(Notification).where(Notification.user_id == user_id)

    # Apply read filter
    if is_read is not None:
        statement = statement.where(Notification.is_read == is_read)

    # Count total before pagination
    count_statement = select(func.count()).select_from(
        statement.subquery()
    )
    total = session.exec(count_statement).one()

    # Count unread
    unread_statement = select(func.count()).where(
        Notification.user_id == user_id,
        Notification.is_read == False
    )
    unread_count = session.exec(unread_statement).one()

    # Apply sorting (newest first) and pagination
    statement = statement.order_by(Notification.created_at.desc())
    statement = statement.offset(offset).limit(limit)

    notifications = session.exec(statement).all()

    return {
        "notifications": notifications,
        "total": total,
        "unread_count": unread_count
    }


@router.get("/unread-count", response_model=dict)
async def get_unread_count(
    session: Session = Depends(get_session),
    user_id_str: str = Depends(get_current_user)
):
    """
    Get the count of unread notifications for badge display

    Returns:
        dict with unread_count
    """
    user_id = UUID(user_id_str)

    statement = select(func.count()).where(
        Notification.user_id == user_id,
        Notification.is_read == False
    )
    unread_count = session.exec(statement).one()

    return {"unread_count": unread_count}


@router.patch("/{notification_id}/read", response_model=NotificationResponse)
async def mark_notification_read(
    notification_id: int,
    session: Session = Depends(get_session),
    user_id_str: str = Depends(get_current_user)
):
    """
    Mark a single notification as read

    Args:
        notification_id: ID of notification to mark as read

    Returns:
        Updated notification
    """
    user_id = UUID(user_id_str)
    notification = session.get(Notification, notification_id)

    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")

    if notification.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this notification")

    notification.is_read = True
    session.add(notification)
    session.commit()
    session.refresh(notification)

    return notification


@router.patch("/read-all", response_model=dict)
async def mark_all_notifications_read(
    session: Session = Depends(get_session),
    user_id_str: str = Depends(get_current_user)
):
    """
    Mark all notifications as read for the authenticated user

    Returns:
        dict with count of updated notifications
    """
    user_id = UUID(user_id_str)

    # Get all unread notifications for this user
    statement = select(Notification).where(
        Notification.user_id == user_id,
        Notification.is_read == False
    )
    notifications = session.exec(statement).all()

    # Mark all as read
    count = 0
    for notification in notifications:
        notification.is_read = True
        session.add(notification)
        count += 1

    session.commit()

    return {"updated_count": count}


@router.delete("/{notification_id}", status_code=204)
async def delete_notification(
    notification_id: int,
    session: Session = Depends(get_session),
    user_id_str: str = Depends(get_current_user)
):
    """
    Delete a notification

    Args:
        notification_id: ID of notification to delete
    """
    user_id = UUID(user_id_str)
    notification = session.get(Notification, notification_id)

    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")

    if notification.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this notification")

    session.delete(notification)
    session.commit()


@router.post("/check-deadlines", response_model=dict)
async def check_deadlines(
    session: Session = Depends(get_session),
    user_id_str: str = Depends(get_current_user)
):
    """
    Check for upcoming task deadlines and create notifications.
    Creates notifications for tasks with deadlines within the next 10 minutes
    that haven't already been notified.

    Returns:
        dict with count of new notifications created
    """
    user_id = UUID(user_id_str)
    now = datetime.utcnow()
    reminder_window = now + timedelta(minutes=10)

    # Find tasks with upcoming deadlines (within 10 minutes)
    # that are not completed
    statement = select(Task).where(
        Task.user_id == user_id,
        Task.due_date.isnot(None),
        Task.due_date <= reminder_window,
        Task.due_date > now,  # Not yet passed
        Task.is_completed == False
    )
    tasks_with_deadlines = session.exec(statement).all()

    new_notifications_count = 0

    for task in tasks_with_deadlines:
        # Check if we already have a notification for this task's deadline
        existing_notification = session.exec(
            select(Notification).where(
                Notification.task_id == task.id,
                Notification.type == "deadline_reminder"
            )
        ).first()

        if not existing_notification:
            # Calculate minutes until deadline
            minutes_until = int((task.due_date - now).total_seconds() / 60)

            notification = Notification(
                user_id=user_id,
                task_id=task.id,
                type="deadline_reminder",
                title=f"Deadline approaching: {task.title}",
                message=f"Task '{task.title}' is due in {minutes_until} minutes."
            )
            session.add(notification)
            new_notifications_count += 1

    session.commit()

    return {"new_notifications_count": new_notifications_count}
