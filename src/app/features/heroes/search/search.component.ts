import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  @Output() searchText: BehaviorSubject<string|null> = new BehaviorSubject<string|null>('');
  searchForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initSearchForm();
    this.onSearchChange();
  }

  initSearchForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  onSearchChange(): void {
    this.searchForm.get('search')?.valueChanges.subscribe({
      next: (value: string) => {
        if (value.length > 1) {
          this.searchText.next(value);
        } else if (value.length === 0) {
          this.searchText.next(null);
        }
      }
    });
  }

}
