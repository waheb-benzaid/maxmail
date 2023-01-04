import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarDatePipe } from 'angular-calendar/modules/common/calendar-date.pipe';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { formatDate } from 'src/app/utils/Functions/format-date';

@Component({
  selector: 'app-todays-drops',
  templateUrl: './todays-drops.component.html',
  styleUrls: ['./todays-drops.component.css'],
})
export class TodaysDropsComponent implements OnInit {
  constructor(
    private campaignService: CampaignService,
    private datePipe: DatePipe
  ) {}
  public allCampaigns$ = this.campaignService.getAllCampaigns();
  public todayDateString!: any;
  ngOnInit(): void {
    this.todayDateString = formatDate(new Date(), this.datePipe);
  }
}
