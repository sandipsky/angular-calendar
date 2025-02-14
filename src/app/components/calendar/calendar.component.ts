import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import NepaliDate from 'nepali-date-converter'

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  calendarType: 'AD' | 'BS' = 'BS';
  calendarMode: 'Monthly' | 'Weekly' | 'Daily' = 'Monthly';
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth();
  selectedDay: number = new Date().getDate();
  selectedWeekIndex: number = 0;
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

  selectedNepaliYear: number = new NepaliDate(new Date()).getYear();
  selectedNepaliMonth: number = new NepaliDate(new Date()).getMonth();
  selectedNepaliDay: number = new NepaliDate(new Date()).getDate();
  selectedNepaliWeekIndex: number = 0;
  nepaliMonths: string[] = [
    'Baisakh',
    'Jestha',
    'Asar',
    'Shrawn',
    'Bhadra',
    'Ashoj',
    'Kartik',
    'Mangsir',
    'Poush',
    'Magh',
    'Falgun',
    'Chaitra',
  ];
  nepaliCalendar: any[] = [];
  private converter = new NepaliDate();

  constructor() {
    this.generateCalendar();
    this.getSelectedWeekIndex();
    this.generateNepaliCalendar();
    this.getSelectedNepaliWeekIndex();
  }

  onClickPrev() {
    switch (this.calendarMode) {
      case 'Monthly':
        this.calendarType == 'AD' ? this.gotoPreviousMonth() : this.gotoPreviousNepaliMonth();
        break;
      case 'Weekly':
        this.calendarType == 'AD' ? this.gotoPreviousWeek() : this.gotoPreviousNepaliWeek();;
        break;
      case 'Daily':
        this.calendarType == 'AD' ? this.gotoPreviousDay() : this.gotoPreviousNepaliDay();
        break;
    }
  }

  onClickNext() {
    switch (this.calendarMode) {
      case 'Monthly':
        this.calendarType == 'AD' ? this.gotoNextMonth() : this.gotoNextNepaliMonth();
        break;
      case 'Weekly':
        this.calendarType == 'AD' ? this.gotoNextWeek() : this.gotoNextNepaliWeek();;
        break;
      case 'Daily':
        this.calendarType == 'AD' ? this.gotoNextDay() : this.gotoNextNepaliDay();
        break;
    }
  }

  getSelectedWeekIndex() {
    this.selectedWeekIndex = this.calendar.findIndex(week =>
      week.some((day: any) => day.day === String(this.selectedDay).padStart(2, '0'))
    );
  }

  getSelectedNepaliWeekIndex() {
    this.selectedNepaliWeekIndex = this.nepaliCalendar.findIndex(week =>
      week.some((day: any) => day.day === String(this.selectedNepaliDay).padStart(2, '0'))
    );
  }

  gotoPreviousMonth() {
    if (this.selectedMonth == 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.generateCalendar();
  }

  gotoPreviousNepaliMonth() {
    if (this.selectedNepaliMonth == 0) {
      this.selectedNepaliMonth = 11;
      this.selectedNepaliYear--;
    } else {
      this.selectedNepaliMonth--;
    }
    this.generateNepaliCalendar();
  }

  gotoNextMonth() {
    if (this.selectedMonth == 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.generateCalendar();
  }

  gotoNextNepaliMonth() {
    if (this.selectedNepaliMonth == 11) {
      this.selectedNepaliMonth = 0;
      this.selectedNepaliYear++;
    } else {
      this.selectedNepaliMonth++;
    }
    this.generateNepaliCalendar();
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

  gotoPreviousNepaliWeek() {
    if (this.selectedNepaliWeekIndex == 0) {
      this.gotoPreviousNepaliMonth();
      this.selectedNepaliWeekIndex = this.nepaliCalendar?.length - 1;
    }
    else {
      this.selectedNepaliWeekIndex -= 1;
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

  gotoNextNepaliWeek() {
    if (this.selectedNepaliWeekIndex == this.nepaliCalendar?.length - 1) {
      this.gotoNextNepaliMonth();
      this.selectedNepaliWeekIndex = 0;
    }
    else {
      this.selectedNepaliWeekIndex += 1;
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

  gotoPreviousNepaliDay() {
    if (this.selectedNepaliDay == 1) {
      this.gotoPreviousNepaliMonth();
      this.selectedNepaliDay = new NepaliDate(this.selectedNepaliYear, this.selectedNepaliMonth + 1, 0).getDate();
    }
    else if (this.getCurrentNepaliWeekDay() == 'Sun') {
      this.gotoPreviousNepaliWeek();
      this.selectedNepaliDay -= 1;
    }
    else {
      this.selectedNepaliDay -= 1;
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

  gotoNextNepaliDay() {
    const totalDays = new NepaliDate(this.selectedNepaliYear, this.selectedNepaliMonth + 1, 0).getDate();
    if (this.selectedNepaliDay == totalDays) {
      this.gotoNextNepaliMonth();
      this.selectedNepaliDay = 1;
    }
    else if (this.getCurrentNepaliWeekDay() == 'Sat') {
      this.gotoNextNepaliWeek();
      this.selectedNepaliDay += 1;
    }
    else {
      this.selectedNepaliDay += 1;
    }
  }

  getCurrentWeekDay() {
    const currentDay = new Date(`${this.selectedYear}-${this.selectedMonth + 1}-${this.selectedDay}`).getDay();
    return this.weekdays[currentDay];
  }

  getCurrentNepaliWeekDay() {
    const currentDay = new NepaliDate(`${this.selectedNepaliYear}-${this.selectedNepaliMonth + 1}-${this.selectedNepaliDay}`).getDay();
    return this.weekdays[currentDay];
  }

  getYears() {
    let years: number[] = [];
    for (let i = 2000; i <= 2030; i++) {
      years.push(i);
    }
    return years;
  }

  getNepaliYears() {
    let years: number[] = [];
    for (let i = 2050; i <= 2100; i++) {
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

    if (mode == 'Monthly') {
      this.selectedDay = 1;
      this.selectedNepaliDay = 1;
      this.selectedNepaliWeekIndex = 0;
      this.selectedWeekIndex = 0;
    }
  }

  convertToNepaliDate(date: string) {
    const d = new NepaliDate(new Date(date)).getDateObject();
    console.log(d);
    return '1'; 
  }

  convertToEnglishDate(date: string) {

  }

  getDate(day: number, monthOffset = 0) {
    const date = new Date(this.selectedYear, this.selectedMonth + monthOffset, day);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  getNepaliDate(day: number, monthOffset = 0) {
    const date = new NepaliDate(this.selectedNepaliYear, this.selectedNepaliMonth + monthOffset, day);
    return `${date.getYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  generateCalendar() {
    this.calendar = [];
    const startingDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
    const totalDays = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    const prevMonthTotalDays = new Date(this.selectedYear, this.selectedMonth, 0).getDate();

    let weekRow = [];

    // Add previous month's days
    for (let i = startingDay - 1; i >= 0; i--) {
      const day = prevMonthTotalDays - i;
      weekRow.push({
        day: String(day).padStart(2, '0'),
        date: this.getDate(day, -1),
        currentMonth: false,
      });
    }
    // Add current month days
    for (let day = 1; day <= totalDays; day++) {
      weekRow.push({
        day: String(day).padStart(2, '0'),
        date: this.getDate(day),
        currentMonth: true
      });

      if (weekRow.length === 7) {
        this.calendar.push([...weekRow]);
        weekRow = [];
      }
    }
    // Add next month's days using a for loop
    for (let nextMonthDay = 1; weekRow.length < 7; nextMonthDay++) {
      weekRow.push({
        day: String(nextMonthDay).padStart(2, '0'),
        date: this.getDate(nextMonthDay, 1),
        nepaliDate: this.convertToNepaliDate(this.getDate(nextMonthDay, 1)),
        nepaliDay: this.convertToNepaliDate(this.getDate(nextMonthDay, 1))?.split('-')[2],
        currentMonth: false
      });
    }
    this.calendar.push([...weekRow]);
  }

  generateNepaliCalendar() {
    this.nepaliCalendar = [];
    const startingDay = new NepaliDate(this.selectedNepaliYear, this.selectedNepaliMonth, 1).getDay();
    const totalDays = new NepaliDate(this.selectedNepaliYear, this.selectedNepaliMonth + 1, 0).getDate();
    const prevMonthTotalDays = new NepaliDate(this.selectedNepaliYear, this.selectedNepaliMonth, 0).getDate();

    let weekRow = [];

    // Add previous month's days
    for (let i = startingDay - 1; i >= 0; i--) {
      const day = prevMonthTotalDays - i;
      weekRow.push({
        day: String(prevMonthTotalDays - i).padStart(2, '0'),
        date: this.getNepaliDate(day, -1),
        currentMonth: false
      });
    }
    // Add current month days
    for (let day = 1; day <= totalDays; day++) {
      weekRow.push({
        date: this.getNepaliDate(day),
        day: String(day).padStart(2, '0'),
        currentMonth: true
      });

      if (weekRow.length === 7) {
        this.nepaliCalendar.push([...weekRow]);
        weekRow = [];
      }
    }
    // Add next month's days using a for loop
    for (let nextMonthDay = 1; weekRow.length < 7; nextMonthDay++) {
      weekRow.push({
        day: String(nextMonthDay).padStart(2, '0'),
        date: this.getNepaliDate(nextMonthDay, 1),
        currentMonth: false
      });
    }
    this.nepaliCalendar.push([...weekRow]);
  }

}
