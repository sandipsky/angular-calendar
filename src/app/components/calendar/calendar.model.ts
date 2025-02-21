export interface CalendarDay {
    nepaliDay: string;
    nepaliDate: string;
    englishDate: string;
    englishDay: string;
    currentMonth: boolean;
}

export type CalendarType = 'AD' | 'BS';

export type CalendarMode = 'Monthly' | 'Weekly' | 'Daily';