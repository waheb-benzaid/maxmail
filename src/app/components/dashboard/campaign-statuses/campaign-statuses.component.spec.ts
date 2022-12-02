import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignStatusesComponent } from './campaign-statuses.component';

describe('CampaignStatusesComponent', () => {
  let component: CampaignStatusesComponent;
  let fixture: ComponentFixture<CampaignStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignStatusesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
