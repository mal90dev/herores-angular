import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipes/safe.pipe';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { UpperCaseFirstDirective } from './directives/upper-case-first.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './components/spinner/spinner.component';

const materialModules = [
  MatSnackBarModule,
  MatIconModule,
  MatDialogModule,
  MatButtonModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    SafePipe,
    SnackBarComponent,
    DialogComponent,
    UpperCaseFirstDirective,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    materialModules,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    materialModules,
    FormsModule,
    ReactiveFormsModule,
    SafePipe,
    UpperCaseFirstDirective,
    SpinnerComponent
  ]
})
export class SharedModule { }
