import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NotesComponent} from './notes.component';

describe('HomeComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesComponent]
    });
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
