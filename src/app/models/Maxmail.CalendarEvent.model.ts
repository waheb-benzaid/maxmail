import { CalendarEvent } from 'angular-calendar';

export interface MaxmailCalendarEvent extends CalendarEvent {
  campaignId?: string;
  dropNumber?: number;
}
