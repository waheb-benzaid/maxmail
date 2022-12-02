import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysDropsComponent } from './todays-drops.component';

describe('TodaysDropsComponent', () => {
  let component: TodaysDropsComponent;
  let fixture: ComponentFixture<TodaysDropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysDropsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysDropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
