import {Component, ViewChild} from '@angular/core';
import {NotesService} from "../service/notes.service";
import {NoteType} from "../models/note-type";
import {PaginationComponent} from "../pagination/pagination.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private activeNoteType:NoteType;
  private searchText: string;
  @ViewChild("pagination") paginationComponent: PaginationComponent;
  constructor(private noteService:NotesService){}

  handleEmitedNoteType(noteType: NoteType) {

      this.activeNoteType = noteType;
    // console.log(noteType);
    this.noteService.noteTypeChanged(this.activeNoteType);
    this.paginationComponent.getPageNumber()
  }

  handleEmitedSearchText(search: string) {

    this.searchText = search;
    this.noteService.noteSearchChanged(this.searchText);
    // console.log(search);
    this.paginationComponent.getPageNumber()

  }

}
