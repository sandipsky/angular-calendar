import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';

@Component({
    selector: 'app-root',
    imports: [CalendarComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angular-calendar';
}
