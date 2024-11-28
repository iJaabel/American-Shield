"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ActivityFiltersProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onDateChange: (dates: { from: Date | undefined; to: Date | undefined }) => void;
}

export function ActivityFilters({ dateRange, onDateChange }: ActivityFiltersProps) {
  const handleClearDates = () => {
    onDateChange({ from: undefined, to: undefined });
  };

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date-range-picker"
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !dateRange.from && "text-muted-foreground"
            )}
            aria-label="Select date range"
            aria-expanded="false"
            aria-controls="date-range-calendar"
            aria-haspopup="true"
          >
            <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0" 
          align="start"
          id="date-range-calendar"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange.from}
            selected={dateRange}
            onSelect={onDateChange}
            numberOfMonths={2}
            disabled={(date) => date > new Date()}
            aria-label="Date range calendar"
          />
        </PopoverContent>
      </Popover>

      {(dateRange.from || dateRange.to) && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClearDates}
          aria-label="Clear date range"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}