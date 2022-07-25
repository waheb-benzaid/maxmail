import { DatePipe } from '@angular/common';

export function formatDate(date: any, datePipe: DatePipe) {
  return datePipe.transform(date, 'yyyy-MM-dd');
}
