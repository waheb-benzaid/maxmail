import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';

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

export function getDateWithoutTime(date: any) {
  // let dateToPrint = date.toDateString();
  // return dateToPrint;
  // return [
  //   date.getFullYear(),
  //   padTo2Digits(date.getMonth() + 1),
  //   padTo2Digits(date.getDate()),
  // ].join('-');
}
// function padTo2Digits(num: any) {
//   return num.toString().padStart(2, '0');
// }
