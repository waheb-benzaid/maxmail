import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewZipcodeComponent } from './new-zipcode.component';

describe('NewZipcodeComponent', () => {
  let component: NewZipcodeComponent;
  let fixture: ComponentFixture<NewZipcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewZipcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewZipcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
