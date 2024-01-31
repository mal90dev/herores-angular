import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../../features/heroes/shared/interfaces/hero.interface';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ]
})
export class CardComponent {

  @Input() hero?: Hero;
  @Output() onRemove = new EventEmitter<number|undefined>(); 
  @Output() onDetails = new EventEmitter<number|undefined>(); 

  remove(): void {
    this.onRemove.next(this.hero?.id);
  }

  details(): void {
    this.onDetails.next(this.hero?.id);
  }
  
}
