import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './pipes/safe.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UpperCaseFirstDirective } from './directives/upper-case-first.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    UpperCaseFirstDirective
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
    UpperCaseFirstDirective
  ]
})
export class SharedModule { }
