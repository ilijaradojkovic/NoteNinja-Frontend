import { Component } from '@angular/core';
import {NotesService} from "../service/notes.service";
import {NoteType} from "../models/note-type";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private activeNoteType:NoteType;

  constructor(private noteService:NotesService){}

  handleEmitedNoteType(noteType: NoteType) {
    if(noteType!=this.activeNoteType) {
      this.activeNoteType = noteType;
      console.log(noteType);
      this.noteService.noteTypeChanged(this.activeNoteType);
    }
  }
}
