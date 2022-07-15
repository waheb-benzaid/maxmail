import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecordsTableService {
  constructor() {}

  getColumns(columns: string[]): string[] {
    return columns;
  }

  getDataSource(dataSource: any[]): any[] {
    return dataSource;
  }
}
