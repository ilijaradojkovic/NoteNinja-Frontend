import {Component, Input, OnInit} from '@angular/core';
import {Note} from "../models/note";
import {NoteType} from "../models/note-type";
import {Router} from "@angular/router";
import {NotesService} from "../service/notes.service";
import {AlertService} from "../service/alert.service";
import {DataNotifierService} from "../data-notifier.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit{

  @Input() note:Note;
  noteColor:string='black';

  constructor(private alertService:AlertService,private router:Router,private noteService:NotesService,private dataNotifier:DataNotifierService) {
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
    let isLocked=this.note.isLocked;
    let password="123456"

    this.router.navigate(['/note',id],{queryParams:{'isLocked':isLocked,'password':password}});
  }

  deleteNote(id: string, $event: MouseEvent) {
    this.noteService.deleteNote(id).subscribe(
      request=>{},
      error => {
        this.alertService.showAlert({message:'Could not delete.Try again later.',isError:true})
      },
      ()=>{
        this.alertService.showAlert({message:'Successfully deleted.',isError:false})
        this.dataNotifier.notify();
      }
    );
    $event.stopPropagation();

  }

  toggleFavorites(id: string, favorites: boolean, $event: MouseEvent) {
    this.noteService.toggleFavorites(id,favorites).subscribe(
      (response)=>{},
      error => {
        this.alertService.showAlert({message:(favorites)? 'Could not add to favorites.Try again later.': 'Could not remove from favorites.Try again later.',isError:true})

      },
      ()=>{
        this.alertService.showAlert({message:(favorites)? 'Note added to favorites.': 'Note removed from favorites.',isError:false})

      }
    );
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
