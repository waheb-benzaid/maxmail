import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadLibraryComponent } from './file-upload-library.component';

describe('FileUploadLibraryComponent', () => {
  let component: FileUploadLibraryComponent;
  let fixture: ComponentFixture<FileUploadLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
