import { Component } from '@angular/core';
import {NotesService} from "../service/notes.service";
import {NoteType} from "../models/note-type";
import {NgForm} from "@angular/forms";
import {SaveNoteRequest} from "../models/save-note-request";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private activeNoteType:NoteType;
  private searchText:string;

  constructor(private noteService:NotesService){}

  handleEmitedNoteType(noteType: NoteType) {

      this.activeNoteType = noteType;
      console.log(noteType);
      this.noteService.noteTypeChanged(this.activeNoteType);

  }

  handleEmitedSearchText(search: string) {

      this.searchText=search;
      this.noteService.noteSearchChanged(this.searchText);
      console.log(search);
  }

}
