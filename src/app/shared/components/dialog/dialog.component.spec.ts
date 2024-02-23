import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { DialogDataGrid } from '../../interfaces/dialogDataGrid.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { screen } from '@testing-library/angular';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let matDialogData: DialogDataGrid;
  let dialogRef: MatDialogRef<DialogComponent>;

  beforeEach(async () => {

    matDialogData = {
      title: 'testing title',
      textContent: 'testing textContent',
      buttonTextOk: 'Ok',
      buttonTextCancel: 'Cancel'
    };
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: matDialogData
        },
        { 
          provide: MatDialogRef, 
          useValue: {
            close: jest.fn()
          }
        }
      ]
    })
    .compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef<DialogComponent>);
    fixture.detectChanges();
  });

  it('should render component', () => {
    expect(component).toBeTruthy();
  });

  it('should show title', () => {
    expect(screen.getByRole('heading')).toHaveTextContent(matDialogData.title);
  });

  it('should show textConent', () => {
    expect(screen.getByText(matDialogData.textContent)).toBeInTheDocument();
  });

  it('should show two buttons', () => {
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getByRole('button', {name: matDialogData.buttonTextOk})).toBeVisible();
    expect(screen.getByRole('button', {name: matDialogData.buttonTextCancel})).toBeVisible();
  });
  
  it('should call onCancel and close the dialog with false on onCancel()', () => {
    const spy = jest.spyOn(dialogRef, 'close');
    component.onCancel();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should call onAccept and close the dialog with true on onAccept()', () => {
    const spy = jest.spyOn(dialogRef, 'close');
    component.onAccept();
    expect(spy).toHaveBeenCalledWith(true);
  });

});
