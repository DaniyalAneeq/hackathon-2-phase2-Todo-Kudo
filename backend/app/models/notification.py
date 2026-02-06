"""
Notification SQLModel for database schema and API responses
"""
from datetime import datetime
from typing import Literal, Optional
from uuid import UUID
from sqlmodel import Field, SQLModel

# Type alias for notification type enum
NotificationType = Literal["deadline_reminder", "deadline_passed"]


class NotificationBase(SQLModel):
    """Base notification fields shared across models"""
    task_id: int = Field(index=True)
    type: str = Field(max_length=50)  # deadline_reminder, deadline_passed
    title: str = Field(max_length=255)
    message: str = Field(max_length=500)
    is_read: bool = Field(default=False)


class Notification(NotificationBase, table=True):
    """Notification database model"""
    __tablename__ = "notifications"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: UUID = Field(index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class NotificationCreate(SQLModel):
    """Schema for creating a new notification"""
    task_id: int
    type: NotificationType
    title: str = Field(max_length=255)
    message: str = Field(max_length=500)


class NotificationResponse(NotificationBase):
    """Schema for notification API responses"""
    id: int
    user_id: UUID
    created_at: datetime
