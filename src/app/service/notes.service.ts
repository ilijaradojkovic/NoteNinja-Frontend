import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {CustomResponse} from "../models/custom-response";
import {NoteType} from "../models/note-type";
import {SaveNoteRequest} from "../models/save-note-request";
import {UpdateNoteRequest} from "../models/update-note-request";

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
        // tap(console.log),
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
       // tap(console.log),
       catchError(this.handleError)
     )
   )
 }

  saveNote(saveNoteRequest:SaveNoteRequest){
   return  this.http.post('http://localhost:8080/notes',saveNoteRequest).pipe(
      // tap(console.log),
      catchError(this.handleError)
    )
 }

  updateNote(value: UpdateNoteRequest,noteId:string) {
    this.http.put(`http://localhost:8080/notes/${noteId}`,value).subscribe();
  }

  getTotalItems() {
    return this.http.get<CustomResponse>(`http://localhost:8080/notes/total?search=${this.search}&note_type=${this.noteType}`);
  }


  getNotesForPage(page:number){
    //in front is displayed with +1
    this.page=page-1;

    this.notes$.next(
      <Observable<CustomResponse>>this.http.get<CustomResponse>(`http://localhost:8080/notes?page=${this.page}&search=${this.search}&note_type=${this.noteType}`)
    )
  }
}
