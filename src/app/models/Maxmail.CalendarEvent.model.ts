import { CalendarEvent } from 'angular-calendar';
import { Drop } from './Drop.model';

export interface MaxmailCalendarEvent extends CalendarEvent {
  totalVolume?: number;
  dropFields?: Drop;
}
