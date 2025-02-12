import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  selectedYear: number = 2025;
  selectedMonth: number = 1;
  selectedDay: number = 1;
  calendarType: 'AD' | 'BS' = 'AD';
  calendarMode: 'Monthly' | 'Weekly' | 'Daily' = 'Monthly';
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  calendar: any = [];

  constructor() {
    this.generateCalendar(this.selectedYear, this.selectedMonth);
  }

  onClickPrev() {
    switch (this.calendarMode) {
      case 'Monthly':
        this.gotoPreviousMonth();
        break;
      case 'Weekly':
        this.gotoPreviousMonth();
        break;
      case 'Daily':
        this.gotoPreviousMonth();
        break;
    }
  }

  onClickNext() {
    switch (this.calendarMode) {
      case 'Monthly':
        this.gotoNextMonth();
        break;
      case 'Weekly':
        this.gotoNextMonth();
        break;
      case 'Daily':
        this.gotoNextMonth();
        break;
    }
  }

  gotoPreviousMonth() {
    if (this.selectedMonth == 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.generateCalendar(this.selectedYear, this.selectedMonth);
  }

  gotoNextMonth() {
    if (this.selectedMonth == 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.generateCalendar(this.selectedYear, this.selectedMonth);
  }

  getYears() {
    let years: number[] = [];
    for (let i = 2000; i <= 2030; i++) {
      years.push(i);
    }
    return years;
  }

  generateCalendar(year: number, month: number) {
    this.calendar = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
    const lastMonthDay = new Date(year, month, 0); 
    const prevMonthTotalDays = lastMonthDay.getDate();

    let weekRow = [];

    // Add previous month's days
    for (let i = startingDay - 1; i >= 0; i--) {
      weekRow.push({ day: String(prevMonthTotalDays - i).padStart(2, '0'), prevMonth: true });
    }
    // Add current month days
    for (let day = 1; day <= totalDays; day++) {
      weekRow.push({ day: String(day).padStart(2, '0') });

      if (weekRow.length === 7) {
        this.calendar.push([...weekRow]);
        weekRow = [];
      }
    }
    // Add next month's days using a for loop
    for (let nextMonthDay = 1; weekRow.length < 7; nextMonthDay++) {
      weekRow.push({ day: String(nextMonthDay).padStart(2, '0'), nextMonth: true });
    }
    this.calendar.push([...weekRow]);
  }

}
