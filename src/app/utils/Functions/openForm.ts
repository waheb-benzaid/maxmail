import { MatDialog } from '@angular/material/dialog';

export function openForms(
  dialog: MatDialog,
  component: any,
  width: string,
  height?: string,
  data?: string,
  componentPanelClass?: string
) {
  dialog.open(component, {
    width,
    height,
    data,
    panelClass: componentPanelClass,
    disableClose: true,
  });
}
