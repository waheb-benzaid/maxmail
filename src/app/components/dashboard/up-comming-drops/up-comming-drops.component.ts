import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign/campaign.service';

@Component({
  selector: 'app-up-comming-drops',
  templateUrl: './up-comming-drops.component.html',
  styleUrls: ['./up-comming-drops.component.css'],
})
export class UpCommingDropsComponent implements OnInit, OnDestroy {
  constructor(private campaignService: CampaignService) {}

  upcommingDropsSub!: Subscription;
  upcommingDrops: any[] = [];
  ngOnInit(): void {
    const todayDate = new Date();
    const nextDate = new Date(new Date().setDate(todayDate.getDate() + 30));
    this.upcommingDropsSub = this.campaignService
      .getAllCampaigns()
      .subscribe((res) => {
        res.forEach((campaign) => {
          campaign.drops.forEach((drop) => {
            const dpDate = new Date(drop.dropDate);
            if (dpDate >= todayDate && dpDate <= nextDate) {
              this.upcommingDrops.push(drop);
            }
          });
        });
      });
  }

  ngOnDestroy(): void {
    if (this.upcommingDropsSub) {
      this.upcommingDropsSub.unsubscribe();
    }
  }
}
