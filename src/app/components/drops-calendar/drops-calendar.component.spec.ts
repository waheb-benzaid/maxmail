import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropsCalendarComponent } from './drops-calendar.component';

describe('DropsCalendarComponent', () => {
  let component: DropsCalendarComponent;
  let fixture: ComponentFixture<DropsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropsCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
