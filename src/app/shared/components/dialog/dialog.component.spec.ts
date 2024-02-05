import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { DialogDataGrid } from '../../interfaces/dialogDataGrid.interface';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let mockMatDialogRef: MatDialogRef<DialogComponent>;
  let mockDialogData: DialogDataGrid = {
    title: 'Test title',
    textContent: 'Test textContent',
    buttonTextOk: 'Test buttonTextOk',
    buttonTextCancel: 'Test buttonTextCancel'
  };

  beforeEach(async () => {
    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: mockMatDialogRef }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title correctly', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.textContent).toBe(component.data.title);
  });

  it('should display the content correctly', () => {
    const contentElement = fixture.debugElement.query(By.directive(MatDialogContent));
    expect(contentElement.nativeElement.textContent).toBe(component.data.textContent);
  });

  it('should display the cancel button with correct text', () => {
    const cancelButton = fixture.debugElement.query(By.css('button[mat-raised-button]:nth-child(1)'));
    expect(cancelButton.nativeElement.textContent.trim()).toBe(component.data.buttonTextCancel);
  });

  it('should display the OK button with correct text', () => {
    const okButton = fixture.debugElement.query(By.css('button[mat-raised-button]:nth-child(2)'));
    expect(okButton.nativeElement.textContent.trim()).toBe(component.data.buttonTextOk);
  });

  it('should close the dialog with false on onCancel()', () => {
    component.onCancel();
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should close the dialog with true on onAccept()', () => {
    component.onAccept();
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(true);
  });
  
});
