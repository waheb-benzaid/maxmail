import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRecentDropsComponent } from './most-recent-drops.component';

describe('MostRecentDropsComponent', () => {
  let component: MostRecentDropsComponent;
  let fixture: ComponentFixture<MostRecentDropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostRecentDropsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostRecentDropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
