import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../shared/models/hero.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
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
