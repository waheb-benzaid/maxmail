import { DatePipe } from '@angular/common';

export function formatDate(date: any, datePipe: DatePipe) {
  if (typeof date === 'string') {
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

export function getDay(date: Date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.getDate();
}

export function getYear(date: Date) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.getFullYear();
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'MMM DD, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
// export function name(params:type) {

// }
