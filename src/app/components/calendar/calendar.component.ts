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
import { firstValueFrom, Observable, Subject } from 'rxjs';
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
  volumeDates$: Observable<VolumeDates> | undefined;
  volume = 0;
  constructor(
    private modal: NgbModal,
    private campaignService: CampaignService,
    private dropVolumeDateService: DropvolumeDatesService,
    private datePipe: DatePipe
  ) {}

  //TODO: Unsubscribe from the obserevable
  getDate(date: Date): number {
    const _date = formatDate(date, this.datePipe);
    console.log(_date, 'dates');
    if (_date) {
      const volumneDate$ = this.dropVolumeDateService
        .getVolumeDateByID(_date)
        .subscribe((res) => {
          if (res) {
            this.volume = res.volume;
          } else {
            this.volume = 0;
          }
        });
    }
    return this.volume;
  }

  ngOnInit(): void {
    this.calendarEventsManager();
  }

  ngOnDestroy(): void {}

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
        objectToInsert.actions = this.actions;
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

  handleEvent(action: string, event: MaxmailCalendarEvent): void {
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
