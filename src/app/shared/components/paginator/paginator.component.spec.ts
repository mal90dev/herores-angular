import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { screen } from '@testing-library/angular';
import { PageEvent } from '@angular/material/paginator';


describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  const pageEvent: PageEvent = {
    pageIndex: 1,
    pageSize: 10,
    length: 10
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    fixture.componentRef.setInput('totalHeroes', 10);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render component', () => {
    expect(component).toBeDefined();
  });

  it('should show mat-paginator', () => {
    expect(screen.getByRole('group')).toBeVisible();
  });

  it('should change pageSize value', () => {
    component.handlePageEvent(pageEvent);
    expect(component.pageSize()).toBe(pageEvent.pageSize);
  });

  it('should change pageIndex value', () => {
    component.handlePageEvent(pageEvent);
    expect(component.pageIndex()).toBe(pageEvent.pageIndex);
  });

  it('should emit eventPaginator event', () => {
    const nextSpy = jest.spyOn(component.eventPaginator, 'next');
    component.handlePageEvent(pageEvent);
    expect(nextSpy).toHaveBeenCalledWith(pageEvent);
  });

});
