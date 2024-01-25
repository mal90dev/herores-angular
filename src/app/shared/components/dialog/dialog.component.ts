import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogDataGrid } from 'src/app/features/heroes/shared/interfaces/dialogDataGrid.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataGrid,
    private readonly dialogRef: MatDialogRef<DialogComponent>) {}

    onCancel(): void {
      this.dialogRef.close(false);
    }

    onAccept(): void {
      this.dialogRef.close(true);
    }
}
