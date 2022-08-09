import { DatePipe } from '@angular/common';
import { retry } from 'rxjs';

export function formatDate(date: any, datePipe: DatePipe) {
  return datePipe.transform(date, 'yyyy-MM-dd');
}

export function getMonth(date: Date) {
  return date.getMonth();
}

export function getDay(date: Date) {
  return date.getUTCDate();
}

export function getYear(date: Date) {
  return date.getFullYear();
}
