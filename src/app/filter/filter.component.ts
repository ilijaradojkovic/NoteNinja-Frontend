import {Component, EventEmitter, Output} from '@angular/core';
import {NoteType} from "../models/note-type";
import {Note} from "../models/note";
import {NgForm} from "@angular/forms";
import {SaveNoteRequest} from "../models/save-note-request";
import {NotesService} from "../service/notes.service";
import {ModalService} from "../service/modal.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

   activeNoteType:NoteType=NoteType.ALL;
   searchText:string=null;


  @Output() activeNoteTypeEvent:EventEmitter<NoteType>=new EventEmitter();
  @Output() searchTextEvent:EventEmitter<string>=new EventEmitter();

  constructor(private modalService:ModalService) {
  }


  filterChanged(noteType: NoteType) {
    this.activeNoteType=noteType;
    this.activeNoteTypeEvent.emit(noteType);

  }

  searchTextChanged(search: HTMLInputElement){

    this.searchText=search.value;
    this.searchTextEvent.emit(search.value);
  }

  public  isNoteType(noteType:NoteType){
    return this. activeNoteType===noteType;
  }
    public  isNotNoteType(noteType:NoteType){
    return this. activeNoteType!=noteType;
  }

  protected readonly NoteType = NoteType;


  public openSaveNoteModal(){
    this.modalService.toggleModal('save-note-modal')
  }
}
