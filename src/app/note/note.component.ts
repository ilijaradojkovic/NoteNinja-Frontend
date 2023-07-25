import {Component, Input, OnInit} from '@angular/core';
import {Note} from "../models/note";
import {NoteType} from "../models/note-type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit{

  @Input() note:Note;
  noteColor:string='black';

  constructor(private router:Router) {
  }
  getNoteColor() {
    switch (this.note.noteType){
      case NoteType.IMPORTANT: return this.noteColor='#D45858';
      case  NoteType.SOCIAL: return this.noteColor='#38AEE6';
      case NoteType.BUSINESS: return this.noteColor='#D4B958';
      default: return this.noteColor='black';
    }
  }

  ngOnInit(): void {
    this.getNoteColor();
  }

  navigateToDetails(id: string) {
    this.router.navigate(['/note',id]);
  }
}
