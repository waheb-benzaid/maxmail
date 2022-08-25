import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiatusDatesListComponent } from './hiatus-dates-list.component';

describe('HiatusDatesListComponent', () => {
  let component: HiatusDatesListComponent;
  let fixture: ComponentFixture<HiatusDatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiatusDatesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiatusDatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
