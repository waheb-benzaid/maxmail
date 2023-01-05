import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign/campaign.service';

@Component({
  selector: 'app-most-recent-campaigns',
  templateUrl: './most-recent-campaigns.component.html',
  styleUrls: ['./most-recent-campaigns.component.css'],
})
export class MostRecentCampaignsComponent implements OnInit {
  constructor(private campaignService: CampaignService) {}

  public recentCampaigns$ =
    this.campaignService.getMostRecentCreatedCampaigns();

  ngOnInit(): void {}
}
