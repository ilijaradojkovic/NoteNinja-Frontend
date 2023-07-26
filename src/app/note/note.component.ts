import {Component, Input, OnInit} from '@angular/core';
import {Note} from "../models/note";
import {NoteType} from "../models/note-type";
import {Router} from "@angular/router";
import {NotesService} from "../service/notes.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit{

  @Input() note:Note;
  noteColor:string='black';

  constructor(private router:Router,private noteService:NotesService) {
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

  deleteNote(id: string, $event: MouseEvent) {
    this.noteService.deleteNote(id);
    $event.stopPropagation();
  }

  toggleFavorites(id: string, favorites: boolean, $event: MouseEvent) {
    this.noteService.toggleFavorites(id,favorites);
    this.note.isFavorite=favorites;
    $event.stopPropagation();
  }

  eneterFavorites(favorites: HTMLElement) {
    if(this.note.isFavorite){
      favorites.classList.remove('fa-solid');

      favorites.classList.add('fa-regular');
    }
    else{
      favorites.classList.remove('fa-regular');

      favorites.classList.add('fa-solid');
    }

  }

  leaveFavorites(favorites: HTMLElement) {
    if(this.note.isFavorite){
      favorites.classList.add('fa-solid');

      favorites.classList.remove('fa-regular');
    }else{
      favorites.classList.add('fa-regular');

      favorites.classList.remove('fa-solid');
    }

  }
}
