import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {

  @Output() eventPaginator = new EventEmitter<PageEvent>();
  @Input() totalHeroes: number = 0;

  length = 25;
  pageSize = 8;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent?: PageEvent;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.totalHeroes?.currentValue) {
      this.length = changes.totalHeroes.currentValue; // mirar si está bien
    }
  }

  handlePageEvent(e: PageEvent): void {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.eventPaginator.next(e);
  }
}
