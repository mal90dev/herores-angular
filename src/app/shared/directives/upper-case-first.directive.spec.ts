import { Component, DebugElement } from '@angular/core';
import { UpperCaseFirstDirective } from './upper-case-first.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  template: '<input appUpperCaseFirst [(ngModel)]="model">'
})
class TestComponent {
  model = '';
}

class MockNgControl {
  value: any;
}

describe('UpperCaseFirstDirective', () => {


  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let inputElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [UpperCaseFirstDirective, TestComponent],
      providers: [
        { provide: NgControl, useClass: MockNgControl }
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.directive(UpperCaseFirstDirective));

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new UpperCaseFirstDirective(TestBed.inject(NgControl));
    expect(directive).toBeTruthy();
  });

  it('should capitalize the first letter on input', () => {
    const inputValue = 'test';
    const expectedValue = 'Test';
    component.model = inputValue;
    inputElement.triggerEventHandler('input', { target: { value: inputValue } });
    fixture.detectChanges();
    expect(component.model).toEqual(expectedValue);
  });

});
