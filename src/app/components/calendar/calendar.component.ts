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
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth();
  selectedDay: number = new Date().getDate();
  selectedWeekIndex: number = 0;
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
  calendar: any[] = [];

  constructor() {
    this.generateCalendar(this.selectedYear, this.selectedMonth);
    this.selectedWeekIndex = this.calendar.findIndex(week =>
      week.some((day: any) => day.day === String(this.selectedDay).padStart(2, '0'))
    );
  }

  onClickPrev() {
    switch (this.calendarMode) {
      case 'Monthly':
        this.gotoPreviousMonth();
        break;
      case 'Weekly':
        this.gotoPreviousWeek();
        break;
      case 'Daily':
        this.gotoPreviousDay();
        break;
    }
  }

  onClickNext() {
    switch (this.calendarMode) {
      case 'Monthly':
        this.gotoNextMonth();
        break;
      case 'Weekly':
        this.gotoNextWeek();
        break;
      case 'Daily':
        this.gotoNextDay();
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

  gotoPreviousWeek() {
    if (this.selectedWeekIndex == 0) {
      this.gotoPreviousMonth();
      this.selectedWeekIndex = this.calendar?.length - 1;
    }
    else {
      this.selectedWeekIndex -= 1;
    }
  }

  gotoNextWeek() {
    if (this.selectedWeekIndex == this.calendar?.length - 1) {
      this.gotoNextMonth();
      this.selectedWeekIndex = 0;
    }
    else {
      this.selectedWeekIndex += 1;
    }
  }

  gotoPreviousDay() {
    if (this.selectedDay == 1) {
      this.gotoPreviousMonth();
      this.selectedDay = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    }
    else if (this.getCurrentWeekDay() == 'Sun') {
      this.gotoPreviousWeek();
      this.selectedDay -= 1;
    }
    else {
      this.selectedDay -= 1;
    }
  }

  gotoNextDay() {
    const totalDays = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    if (this.selectedDay == totalDays) {
      this.gotoNextMonth();
      this.selectedDay = 1;
    }
    else if (this.getCurrentWeekDay() == 'Sat') {
      this.gotoNextWeek();
      this.selectedDay += 1;
    }
    else {
      this.selectedDay += 1;
    }
  }

  getCurrentWeekDay() {
    const currentDay = new Date(`${this.selectedYear}-${this.selectedMonth + 1}-${this.selectedDay}`).getDay();
    return this.weekdays[currentDay];
  }

  getYears() {
    let years: number[] = [];
    for (let i = 2000; i <= 2030; i++) {
      years.push(i);
    }
    return years;
  }

  getHours() {
    let hours: string[] = [];
    for (let i = 0; i <= 23; i++) {
      let hour = String(i).padStart(2, '0') + ':00';
      hours.push(hour);
    }
    return hours;
  }

  changeCalendarMode(mode: 'Monthly' | 'Weekly' | 'Daily') {
    this.calendarMode = mode;
  }

  generateCalendar(year: number, month: number) {
    this.calendar = [];
    const startingDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

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
