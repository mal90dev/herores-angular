import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let mockMatDialogRef: MatDialogRef<DialogComponent>;

  beforeEach(async () => {
    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
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

  it('should close the dialog with false on onCancel()', () => {
    component.onCancel();
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should close the dialog with true on onAccept()', () => {
    component.onAccept();
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(true);
  });
  
});
