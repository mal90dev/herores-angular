import { ChangeDetectionStrategy, Component, EventEmitter, Output, input, signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  standalone: true,
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatPaginatorModule
  ]
})
export class PaginatorComponent {

  @Output() eventPaginator = new EventEmitter<PageEvent>();

  totalHeroes = input.required<number>();
  pageSize = signal(8);
  pageIndex = signal(0);

  hidePageSize = true;
  showFirstLastButtons = true;

  handlePageEvent(e: PageEvent): void {
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
    this.eventPaginator.next(e);
  }
}
