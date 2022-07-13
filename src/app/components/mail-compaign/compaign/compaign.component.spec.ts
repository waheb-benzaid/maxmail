import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaignComponent } from './compaign.component';

describe('CompaignComponent', () => {
  let component: CompaignComponent;
  let fixture: ComponentFixture<CompaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
