import { MatDialog } from '@angular/material/dialog';

export function openForms(
  dialog: MatDialog,
  component: any,
  width: string = '30%',
  data?: string,
  componentPanelClass?: string
) {
  dialog.open(component, {
    width,
    data,
    panelClass: componentPanelClass,
    disableClose: true,
  });
}
