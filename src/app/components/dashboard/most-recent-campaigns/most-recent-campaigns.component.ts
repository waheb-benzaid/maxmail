import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Campaign } from 'src/app/models/Campaign.model';
import { CampaignService } from 'src/app/services/campaign/campaign.service';

@Component({
  selector: 'app-most-recent-campaigns',
  templateUrl: './most-recent-campaigns.component.html',
  styleUrls: ['./most-recent-campaigns.component.css'],
})
export class MostRecentCampaignsComponent implements OnInit, OnDestroy {
  constructor(private campaignService: CampaignService) {}
  public recentCampaigns$!: Subscription;
  public campaigns: Campaign[] = [];
  ngOnInit(): void {
    this.campaigns.length = 0;
    this.recentCampaigns$ = this.campaignService
      .getMostRecentCreatedCampaigns()
      .subscribe((res) => {
        res.forEach((e) => {
          this.campaigns.push(e.payload.doc.data());
        });
      });
  }
  ngOnDestroy(): void {
    if (this.recentCampaigns$) {
      this.recentCampaigns$.unsubscribe();
    }
  }
}
