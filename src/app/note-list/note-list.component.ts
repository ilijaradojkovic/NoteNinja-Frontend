import {Component, OnInit} from '@angular/core';
import {NotesService} from "../service/notes.service";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppState} from "../models/app-state";
import {CustomResponse} from "../models/custom-response";
import {DataState} from "../models/data-state";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit{

  appState$: Observable<AppState<CustomResponse>> = new Observable<AppState<CustomResponse>>();

  constructor(private noteService:NotesService) {}

  ngOnInit(): void {
    this.noteService.notes$.subscribe((next)=>{
      // console.log(next);
    })

    this.noteService.notes$.subscribe(next=>{

      this.appState$=next.pipe(
        map(response=>{
          return {
            dataState: DataState.LOADED_STATE,
            appData:{...response,data:{notes:response.data.notes?.reverse()}}
          }
        }),
        startWith({dataState:DataState.LOADING_STATE}),
        catchError((error:string)=>{
          return of({dataState:DataState.ERROR_STATE,error:error})
        })
      )
    });


  }
  
}
