import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiatusDatesComponent } from './hiatus-dates.component';

describe('HiatusDatesComponent', () => {
  let component: HiatusDatesComponent;
  let fixture: ComponentFixture<HiatusDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiatusDatesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HiatusDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
