import { Component, ComponentDecorator, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class RecordsTableService {
  constructor(private dialog: MatDialog) {}

  getColumns(columns: string[]): string[] {
    return columns;
  }

  getDataSource(dataSource: any[]): any[] {
    return dataSource;
  }

  public openDialog(
    component: ComponentDecorator,
    componentHeight: string,
    componentWidth: string
  ) {
    this.dialog.open(component, {
      height: componentHeight,
      width: componentWidth,
    });
  }
}
