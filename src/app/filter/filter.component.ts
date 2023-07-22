import {Component, EventEmitter, Output} from '@angular/core';
import {NoteType} from "../models/note-type";
import {Note} from "../models/note";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  public activeNoteType:NoteType=NoteType.ALL;

  @Output() activeNoteTypeEvent:EventEmitter<NoteType>=new EventEmitter();
  filterChanged(noteType: NoteType) {
    this.activeNoteType=noteType;
    this.activeNoteTypeEvent.emit(noteType);

  }

  public  isNoteType(noteType:NoteType){
    return this. activeNoteType===noteType;
  }
    public  isNotNoteType(noteType:NoteType){
    return this. activeNoteType!=noteType;
  }

  protected readonly NoteType = NoteType;

}
