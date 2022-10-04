import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipcodesLookupComponent } from './zipcodes-lookup.component';

describe('ZipcodesLookupComponent', () => {
  let component: ZipcodesLookupComponent;
  let fixture: ComponentFixture<ZipcodesLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZipcodesLookupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ZipcodesLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
