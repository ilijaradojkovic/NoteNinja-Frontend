import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveNoteComponent} from './save-note.component';

describe('SaveNoteComponent', () => {
  let component: SaveNoteComponent;
  let fixture: ComponentFixture<SaveNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveNoteComponent]
    });
    fixture = TestBed.createComponent(SaveNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
