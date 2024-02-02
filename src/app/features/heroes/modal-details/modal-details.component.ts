import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../shared/interfaces/hero.interface';
import { IconsPowerStats } from '../shared/constants/IconsPowerStats';
import { IconsAppearance } from '../shared/constants/IconsAppearance';
import { DialogData } from '../shared/interfaces/dialogData.interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.scss'],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class ModalDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  get hero(): Hero {
    return this.data.hero;
  }

  getIconAppearance(key: keyof typeof IconsAppearance): string {
    return IconsAppearance[key];
  }

  getIconPowerstats(key: keyof typeof IconsPowerStats): string {
    return IconsPowerStats[key];
  }

}
