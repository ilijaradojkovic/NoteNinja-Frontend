import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {CustomResponse} from "../models/custom-response";
import {NoteType} from "../models/note-type";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private page:number=0;
  private search:string='';
  private noteType:NoteType=NoteType.ALL;

  public notes$:BehaviorSubject<Observable<CustomResponse>> = new BehaviorSubject(new Observable<CustomResponse>()) ;


  constructor(private http:HttpClient) {
    this.notes$.next(
      <Observable<CustomResponse>>this.http.get<CustomResponse>(`http://localhost:8080/notes?page=${this.page}&search=${this.search}`).pipe(
        tap(console.log),
        catchError(this.handleError)
      )
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Method not implemented')
  }

  noteTypeChanged(activeNoteType: NoteType) {
  if(this.noteType!=activeNoteType) {
    this.noteType=activeNoteType;
    this.getRequestForAllNotes();

  }
  }

  noteSearchChanged(search: string) {
    if(this.search!=search){
      this.search=search;
      this.getRequestForAllNotes();

    }

  }
 private getRequestForAllNotes(){
   this.notes$.next(this.http.get<CustomResponse>(`http://localhost:8080/notes?page=${this.page}&search=${this.search}&note_type=${this.noteType}`).pipe(
       tap(console.log),
       catchError(this.handleError)
     )
   )
 }
}
