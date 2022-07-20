import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxmailDatePickerComponent } from './maxmail-date-picker.component';

describe('MaxmailDatePickerComponent', () => {
  let component: MaxmailDatePickerComponent;
  let fixture: ComponentFixture<MaxmailDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxmailDatePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxmailDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
