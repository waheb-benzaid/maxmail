import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRecentCampaignsComponent } from './most-recent-campaigns.campaigns';

describe('MostRecentDropsComponent', () => {
  let component: MostRecentCampaignsComponent;
  let fixture: ComponentFixture<MostRecentCampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostRecentCampaignsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MostRecentCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
