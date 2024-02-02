import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ 
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoult call initSearchForm and onSearchChange methods on ngOnInit', () => {
    spyOn(component, 'initSearchForm');
    spyOn(component, 'onSearchChange');
    component.ngOnInit();
    expect(component.initSearchForm).toHaveBeenCalled();
    expect(component.onSearchChange).toHaveBeenCalled();
  });

  it('should be initialized the form', () => {
    component.initSearchForm();
    expect(component.searchForm).not.toBeUndefined();
  });

  describe('onSearchChange method', () => {
    it('should update searchText value', () => {
      const value = 'test';
      component.searchForm.get('search')?.setValue(value);
      expect(component.searchText.value).toEqual(value);
    });
    it('should update searchText value to null', () => {
      const value = '';
      component.searchForm.get('search')?.setValue(value);
      expect(component.searchText.value).toBeNull();
    });
  });
  
});
