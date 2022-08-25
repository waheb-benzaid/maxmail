import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHiatusDatesComponent } from './new-hiatus-dates.component';

describe('NewHiatusDatesComponent', () => {
  let component: NewHiatusDatesComponent;
  let fixture: ComponentFixture<NewHiatusDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHiatusDatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHiatusDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
