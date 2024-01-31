import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SimpleChanges } from '@angular/core';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule
      ],
      declarations: [ PaginatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('ngOnChanges method', () => {
    it('should update the total number of heroes', () => {
      const totalHeroes = 10;
      const changes: SimpleChanges = {
        totalHeroes: {
          currentValue: totalHeroes,
          previousValue: 0,
          firstChange: false,
          isFirstChange: () => false,
        },
      };
      component.ngOnChanges(changes);
      expect(component.length).toEqual(totalHeroes);
    });
    it('Should not update the total number of heroes', () => {
      const length = component.length;
      const changes: SimpleChanges = {
        totalHeroes: {
          currentValue: null,
          previousValue: 0,
          firstChange: false,
          isFirstChange: () => false,
        },
      };
      component.ngOnChanges(changes);
      expect(component.length).toBe(length);
    });
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
    expect(component.pageEvent).toEqual(event);
    expect(component.pageSize).toEqual(event.pageSize);
    expect(component.pageIndex).toEqual(event.pageIndex);
    expect(spy).toHaveBeenCalledWith(event);
  });
  
});
