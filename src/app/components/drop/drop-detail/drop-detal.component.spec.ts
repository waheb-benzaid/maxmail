import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDetalComponent } from './drop-detal.component';

describe('DropDetalComponent', () => {
  let component: DropDetalComponent;
  let fixture: ComponentFixture<DropDetalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropDetalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropDetalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
