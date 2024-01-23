import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUpperCaseFirst]'
})
export class UpperCaseFirstDirective {

  constructor(private readonly control: NgControl) { }

  @HostListener('input', ['$event.target'])
  public onInput(input: HTMLInputElement): void {
    const value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
    this.control.control?.setValue(value);
  }

}
