import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpCommingDropsComponent } from './up-comming-drops.component';

describe('UpCommingDropsComponent', () => {
  let component: UpCommingDropsComponent;
  let fixture: ComponentFixture<UpCommingDropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpCommingDropsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpCommingDropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
