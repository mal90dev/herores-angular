import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('totalHeroes', 10);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the paginator parameters', () => {
    const event: PageEvent = {
      pageIndex: 2,
      previousPageIndex: 1,
      pageSize: 10,
      length: 50
    };
    const spy = spyOn(component.eventPaginator, 'next');
    component.handlePageEvent(event);
    expect(component.pageSize()).toEqual(event.pageSize);
    expect(component.pageIndex()).toEqual(event.pageIndex);
    expect(spy).toHaveBeenCalledWith(event);
  });
  
});
