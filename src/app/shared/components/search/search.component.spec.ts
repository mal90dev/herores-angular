import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';


describe('SearchComponent', () => {

  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render component', () => {
    expect(component).toBeDefined();
  });

  it('should show input', () => {
    const input = screen.getByPlaceholderText('Search');

    expect(input).toBeVisible();
  });

  it('should initialize the form', () => {
    component.initSearchForm();

    expect(component.searchForm).toBeDefined();
  });

  describe('onSearchChange method', () => {
    it('should update searchText value', async () => {
      const spy = jest.spyOn(component.searchText, 'next');
      const input = screen.getByPlaceholderText('Search');
      expect(input).toHaveValue('');

      userEvent.type(input, 'av');

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith('Av');
      });
    });

    it('should update searchText value', async () => {
      const spy = jest.spyOn(component.searchText, 'next');
      const input = screen.getByPlaceholderText('Search');
      component.searchForm.controls.search.setValue('Text');
      expect(input).toHaveValue('Text');

      userEvent.clear(input);

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(null);
      });
    });
    
  });

});
