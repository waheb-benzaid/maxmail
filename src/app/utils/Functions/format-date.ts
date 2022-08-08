import { DatePipe } from '@angular/common';

export function formatDate(date: any, datePipe: DatePipe) {
  return datePipe.transform(date, 'yyyy-MM-dd');
}

export function getMonth(date: Date) {
  return date.getMonth();
}

export function getDay(date: Date) {
  return date.getUTCDate();
}
