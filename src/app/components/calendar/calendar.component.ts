import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { firstValueFrom, Observable, Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { Drop } from 'src/app/models/Drop.model';
import { VolumeDates } from 'src/app/models/VolumeDates.model';
import { DropvolumeDatesService } from 'src/app/services/dropvolume-dates/dropvolume-dates.service';
import { MaxmailCalendarEvent } from '../../models/Maxmail.CalendarEvent.model';
import { formatDate } from '../../utils/Functions/format-date';
import { DatePipe } from '@angular/common';
import { JSDocComment } from '@angular/compiler';
import { CampaignStatus } from 'src/app/utils/Enums/Campaign Enums/CampaignStatus';
volumeDate$: Observable<VolumeDates[]>;
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnInit, OnDestroy {
  constructor(
    private campaignService: CampaignService,
    private dropVolumeDateService: DropvolumeDatesService,
    private datePipe: DatePipe
  ) {}

  volumeDatesList: VolumeDates[] = [];
  getVolume(date: Date): number {
    const _date = formatDate(date, this.datePipe);
    let volumeDate: VolumeDates[] = [];
    volumeDate = this.volumeDatesList.filter((vd) => {
      return vd.date === _date;
    });
    if (volumeDate.length > 0) {
      let volumeArray: number[] = volumeDate[0].volume;
      const volume = volumeArray.reduce((a, b) => {
        return a + b;
      }, 0);
      return volume;
    }
    return 0;
  }

  volumeSubscription!: Subscription;
  ngOnInit(): void {
    this.calendarEventsManager();
    this.volumeSubscription = this.dropVolumeDateService
      .getAllVolumeDate()
      .subscribe((res) => {
        res.forEach((vd) => {
          this.volumeDatesList.push(vd);
        });
      });
  }

  ngOnDestroy(): void {
    this.volumeSubscription.unsubscribe();
  }

  @ViewChild('modalContent', { static: true }) modalContent:
    | TemplateRef<any>
    | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData:
    | {
        action: string;
        event: MaxmailCalendarEvent;
      }
    | undefined;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: MaxmailCalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: MaxmailCalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  refresh = new Subject<void>();
  eventsToDisplay: MaxmailCalendarEvent[] = [];

  events: MaxmailCalendarEvent[] = [];

  async calendarEventsManager() {
    let asyncOpt = this.campaignService.getAllCampaigns();
    let dataSync = await firstValueFrom(asyncOpt);

    dataSync.forEach((campaign) => {
      campaign.drops.forEach((drop) => {
        let objectToInsert = new Object() as MaxmailCalendarEvent;
        objectToInsert.title = `${drop.accountName} : ${drop.dropVolume}`;
        objectToInsert.start = subDays(startOfDay(new Date(drop.dropDate)), 0);
        objectToInsert.allDay = true;
        // objectToInsert.actions = this.actions;
        objectToInsert.totalVolume =
          objectToInsert.totalVolume + drop.dropVolume;
        objectToInsert.color =
          campaign.campaignStatus === CampaignStatus.ACTIVE
            ? { ...colors['blue'] }
            : { ...colors['red'] };
        //FIXME:fix the issue with drop fields
        // objectToInsert.dropFields!.accountName! = drop.accountName;
        // objectToInsert.dropFields!.campaignName = drop.campaignName;
        // objectToInsert.dropFields!.campaignStatus = drop.campaignStatus;
        // objectToInsert.dropFields!.campaignType = drop.campaignType;
        // objectToInsert.dropFields!.dropDate = drop.dropDate;
        // objectToInsert.dropFields!.dropVolume = drop.dropVolume;
        // objectToInsert.dropFields!.isDropCompleted = drop.isDropCompleted;
        // objectToInsert.dropFields!.isLastDrop = drop.isLastDrop;
        // objectToInsert.dropFields!.isDropCompleted = drop.isDropCompleted;
        this.eventsToDisplay.push(objectToInsert);
      });
    });
    this.events = this.eventsToDisplay;
  }

  activeDayIsOpen: boolean = true;

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: MaxmailCalendarEvent[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(_action: string, event: MaxmailCalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
    console.log(event.start);
    console.log(event.title);
    console.log('hi');
  }

  deleteEvent(eventToDelete: MaxmailCalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
