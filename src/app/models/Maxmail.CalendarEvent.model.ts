import { CalendarEvent } from 'angular-calendar';

export interface MaxmailCalendarEvent extends CalendarEvent {
  campaignName?: any;
  dropName?: any;
  dropDate?: any;
  dropNumber?: number;
  dropVolume?: any;
  isLastDrop?: any;
  isDropCompleted?: any;
  isSeededReceived?: any;
  nextAvailableDates?: any;
  printOrderID?: any;
  campaignStatus?: any;
  campaignType?: any;
  contactName?: any;
  mailerSize?: any;
}
