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
  totalItems:number=0;
  itemsPerPage:number=10;
  totalPages:number=0;
  currentPage:number =1;
  constructor(private noteService:NotesService) {}
  get numberArray(): number[] {
    return Array.from({ length: this.totalPages  }, (_, index) => index);
  }
  ngOnInit(): void {
    this.noteService.notes$.subscribe((next)=>{
      console.log(next);
    })
    this.getPageNumber();

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

  getPageNumber(){
    this.noteService.getTotalItems().subscribe((total)=>{

      this.totalItems=total.data['total'] as number;
      this.totalPages=this.customRound(this.totalItems/this.itemsPerPage);
      console.log(this.totalPages)
    });
  }

   customRound(number: number): number {
    const decimalPart = number - Math.floor(number);
    const roundedDecimal = Math.ceil(decimalPart);

    return Math.floor(number) + roundedDecimal;
  }

  backPage() {
    this.currentPage--;
    this.getNotesForCurrPage();
  }

  nextPage() {
      this.currentPage++;
    this.getNotesForCurrPage();
  }


  toPage(i: number) {
    console.log(i);
    this.currentPage=i;
    this.getNotesForCurrPage();
  }

  getNotesForCurrPage(){
    this.noteService.getNotesForPage(this.currentPage);

  }
}
