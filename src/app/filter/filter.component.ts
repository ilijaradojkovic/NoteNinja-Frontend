import {Component, EventEmitter, Output} from '@angular/core';
import {NoteType} from "../models/note-type";
import {Note} from "../models/note";

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

}
