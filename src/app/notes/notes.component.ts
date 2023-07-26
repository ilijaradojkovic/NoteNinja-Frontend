import {Component, ViewChild} from '@angular/core';
import {NotesService} from "../service/notes.service";
import {NoteType} from "../models/note-type";
import {PaginationComponent} from "../pagination/pagination.component";
import {FilterNoteType} from "../models/filter-note-type";

@Component({
  selector: 'app-home',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {

  private activeNoteType:FilterNoteType;
  private searchText: string;
  @ViewChild("pagination") paginationComponent: PaginationComponent;
  constructor(private noteService:NotesService){}

  handleEmitedNoteType(noteType: FilterNoteType) {

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
