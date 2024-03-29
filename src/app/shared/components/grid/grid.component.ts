import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { Hero } from '../../../features/heroes/shared/interfaces/hero.interface';
import { HeroesService } from '../../../features/heroes/shared/services/heroes.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { ModalDetailsComponent } from '../../../features/heroes/modal-details/modal-details.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatGridListModule,
    CardComponent
  ]
})
export class GridComponent {

  heroes = input.required<Hero[]>();
  @Output() eventRemove = new EventEmitter<void>();

  constructor(private readonly heroService: HeroesService,
    private readonly dialog: MatDialog) {
  }

  handleRemove(id: number|undefined): void {
    const dialog = this.openDialog();
    dialog.afterClosed().subscribe({
      next: (res: boolean) => {
        if (res && id) {
          this.heroService.deleteHero(id).subscribe({
            next: () => {
              this.heroService.totalHeroes--;
              this.eventRemove.next();
            }
          });
        }
      }
    });
  }

  handleDetails(id: number|undefined): void {
    if (id) {
      this.getHeroById(id.toString());
    }
  }

  openDialog(): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      width: '300px',
      enterAnimationDuration: '1000',
      exitAnimationDuration: '1000',
      data: {
        title: 'Delete Hero',
        textContent: 'Are you sure to delete?',
        buttonTextOk: 'Ok',
        buttonTextCancel: 'Cancel'
      }
    });
  }

  openModal(hero: Hero): void {
    this.dialog.open(ModalDetailsComponent, {
      width: '500px',
      height: '600px',
      enterAnimationDuration: '1000',
      exitAnimationDuration: '1000',
      data: {
        hero
      }
    });
  }

  getHeroById(id: string): void {
    this.heroService.getHeroById(Number(id)).subscribe({
      next: (hero: Hero) => {
        this.openModal(hero);
      }
    });
  }

}
