import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    MatDividerModule
  ]
})
export class HeaderComponent {

}
