import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarData } from '../../interfaces/snackBarData.interface';

@Component({
  standalone: true,
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  imports: [
    MatIconModule
  ]
})
export class SnackBarComponent<T = any> {
  
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData<T>) { }
}
