import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../shared/models/hero.model';
import { HeroesService } from '../shared/services/heroes.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input() heroes: Hero[] | null = [];
  @Output() eventRemove = new EventEmitter<void>(); 

  constructor(private readonly heroService: HeroesService,
    private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
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

  openDialog(): MatDialogRef<DialogComponent, any> {
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
      width: '550px',
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
