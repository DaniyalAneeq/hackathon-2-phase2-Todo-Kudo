"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Clock, X } from "lucide-react";
import { format } from "date-fns";

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
  showClearButton?: boolean;
}

// Generate hour options (00-23)
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));

// Generate minute options (00-59, in 5-minute increments for easier selection)
const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"));

export function DateTimePicker({
  value,
  onChange,
  disabled = false,
  placeholder = "Pick a date and time",
  showClearButton = false,
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Extract hours and minutes from value
  const selectedHour = value ? value.getHours().toString().padStart(2, "0") : "12";
  const selectedMinute = value ? (Math.round(value.getMinutes() / 5) * 5).toString().padStart(2, "0") : "00";

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange(undefined);
      return;
    }

    // Preserve the existing time when selecting a new date
    const newDate = new Date(date);
    if (value) {
      newDate.setHours(value.getHours());
      newDate.setMinutes(value.getMinutes());
    } else {
      // Default to current time if no previous value
      const now = new Date();
      newDate.setHours(now.getHours());
      newDate.setMinutes(Math.round(now.getMinutes() / 5) * 5);
    }
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    onChange(newDate);
  };

  const handleHourChange = (hour: string) => {
    if (!value) return;
    const newDate = new Date(value);
    newDate.setHours(parseInt(hour, 10));
    onChange(newDate);
  };

  const handleMinuteChange = (minute: string) => {
    if (!value) return;
    const newDate = new Date(value);
    newDate.setMinutes(parseInt(minute, 10));
    onChange(newDate);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
  };

  return (
    <div className="flex gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "flex-1 justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(value, "PPP 'at' HH:mm")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            initialFocus
          />

          {/* Time Selection Section - More Prominent */}
          <div className="border-t bg-muted/50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Select Time</span>
            </div>

            {!value ? (
              <p className="text-sm text-muted-foreground">
                Please select a date first
              </p>
            ) : (
              <div className="flex items-center gap-2">
                <Select value={selectedHour} onValueChange={handleHourChange} disabled={disabled}>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="text-lg font-bold">:</span>

                <Select value={selectedMinute} onValueChange={handleMinuteChange} disabled={disabled}>
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="text-sm text-muted-foreground ml-2">
                  (24h)
                </span>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {showClearButton && value && (
        <Button
          variant="outline"
          size="icon"
          onClick={handleClear}
          disabled={disabled}
          title="Clear date and time"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
