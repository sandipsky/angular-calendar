import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NepaliCalendarComponent } from './nepali-calendar.component';

describe('NepaliCalendarComponent', () => {
  let component: NepaliCalendarComponent;
  let fixture: ComponentFixture<NepaliCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NepaliCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NepaliCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
