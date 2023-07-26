import {Component, EventEmitter, Output} from '@angular/core';
import {NoteType} from "../models/note-type";
import {Note} from "../models/note";
import {NgForm} from "@angular/forms";
import {SaveNoteRequest} from "../models/save-note-request";
import {NotesService} from "../service/notes.service";
import {ModalService} from "../service/modal.service";
import {FilterNoteType} from "../models/filter-note-type";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

   activeNoteType:FilterNoteType=FilterNoteType.ALL;
   searchText:string=null;


  @Output() activeNoteTypeEvent:EventEmitter<FilterNoteType>=new EventEmitter();
  @Output() searchTextEvent:EventEmitter<string>=new EventEmitter();

  constructor(private modalService:ModalService) {
  }


  filterChanged(noteType: FilterNoteType) {
    this.activeNoteType=noteType;
    this.activeNoteTypeEvent.emit(noteType);

  }

  searchTextChanged(search: HTMLInputElement){

    this.searchText=search.value;
    this.searchTextEvent.emit(search.value);
  }

  public  isNoteType(noteType:FilterNoteType){
    return this. activeNoteType===noteType;
  }
    public  isNotNoteType(noteType:FilterNoteType){
    return this. activeNoteType!=noteType;
  }

  protected readonly NoteType = FilterNoteType;


  public openSaveNoteModal(){
    this.modalService.toggleModal('save-note-modal')
  }

  protected readonly FilterNoteType = FilterNoteType;
}
