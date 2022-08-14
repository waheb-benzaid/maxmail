import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Timezone } from '@syncfusion/ej2-angular-schedule';
import { retry } from 'rxjs';

export function formatDate(date: any, datePipe: DatePipe) {
  if (typeof date === 'string') {
    //return;
    date = new Date(date);
  }
  return datePipe.transform(date, 'yyyy-MM-dd');
}

export function getMonth(date: Date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.getMonth();
}

export function getDay(date: Date, datePipe?: DatePipe) {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return date.getUTCDate();
}

export function getYear(date: Date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.getFullYear();
}
