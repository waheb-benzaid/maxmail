import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDropComponent } from './new-drop.component';

describe('NewDropComponent', () => {
  let component: NewDropComponent;
  let fixture: ComponentFixture<NewDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
