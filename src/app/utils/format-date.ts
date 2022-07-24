import { DatePipe } from '@angular/common';

export function formatDate(date: any, datePipe: DatePipe) {
  let formattedDate = datePipe.transform(date, 'yyyy-MM-dd');
  return formattedDate;
}
