import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign/campaign.service';

@Component({
  selector: 'app-campaign-statuses',
  templateUrl: './campaign-statuses.component.html',
  styleUrls: ['./campaign-statuses.component.css'],
})
export class CampaignStatusesComponent implements OnInit {
  constructor(private campaignService: CampaignService) {}
  public activeCampaign$ = this.campaignService.getActiveCampaignsCount();
  public completedCampaign$ = this.campaignService.getCompletedCampaignsCount();
  public suspendedCampaign$ = this.campaignService.getSuspendedCampaignsCount();
  public cancelledCampaign$ = this.campaignService.getCancelledCampaignsCount();
  ngOnInit(): void {}
}
