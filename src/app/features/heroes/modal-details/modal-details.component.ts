import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../shared/models/hero.model';


@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss']
})
export class ModalDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  get hero(): Hero {
    return this.data.hero;
  }

}
