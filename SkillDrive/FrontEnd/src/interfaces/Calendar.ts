import React from "react";

export interface Calendar {
  styles: React.CSSProperties,
  onCalendarClick: (newDate: string) => void;
  selectedFromInputDate: string;
}