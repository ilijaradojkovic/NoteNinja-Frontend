import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {CustomResponse} from "../models/custom-response";
import {SaveNoteRequest} from "../models/save-note-request";
import {UpdateNoteRequest} from "../models/update-note-request";
import {ApiConfiguration} from "../config/api-configuration";
import {FilterNoteType} from "../models/filter-note-type";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private page:number=0;
   search:string='';
   noteType:FilterNoteType=FilterNoteType.ALL;
  public notes$:BehaviorSubject<Observable<CustomResponse>> = new BehaviorSubject(new Observable<CustomResponse>()) ;


  constructor(private http:HttpClient) {
    let jwt= localStorage.getItem('access_token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json') // Example: Setting Content-Type to JSON
      .set('Authorization',`Bearer ${jwt}`)
      .set("Access-Control-Allow-Origin","http://localhost:4200");




    this.notes$.next(
      this.http.get<CustomResponse>(`http://localhost:8080/api/v1/notes?page=${this.page}&search=${this.search}`, {headers}).pipe(
        // tap(console.log),
        catchError(this.handleError)
      )
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => 'Method not implemented')
  }

  noteTypeChanged(activeNoteType: FilterNoteType) {
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
   this.notes$.next(this.http.get<CustomResponse>(`${ApiConfiguration.noteResourceUrl}?page=${this.page}&search=${this.search}&note_type=${this.noteType}`).pipe(
       // tap(console.log),
       catchError(this.handleError)
     )
   )
 }

  saveNote(saveNoteRequest:SaveNoteRequest){
   return  this.http.post(ApiConfiguration.noteResourceUrl,saveNoteRequest).pipe(
      // tap(console.log),
      catchError(this.handleError)
    )
 }

  updateNote(value: UpdateNoteRequest,noteId:string) {
    console.log(value)
    return this.http.put(`${ApiConfiguration.noteResourceUrl}/${noteId}`,value);
  }

  getTotalItems() {
    return this.http.get<CustomResponse>(`${ApiConfiguration.noteResourceUrl}/total?search=${this.search}&note_type=${this.noteType}`);
  }


  getNotesForPage(page:number){
    //in front is displayed with +1
    this.page=page-1;

    this.notes$.next(
      <Observable<CustomResponse>>this.http.get<CustomResponse>(`${ApiConfiguration.noteResourceUrl}?page=${this.page}&search=${this.search}&note_type=${this.noteType}`)
    )
  }

  deleteNote(id: string) {
   return this.http.delete(`${ApiConfiguration.noteResourceUrl}/${id}`);
  }

  toggleFavorites(id: string, favorites: boolean) {


  return this.http.patch(`${ApiConfiguration.noteResourceUrl}/favorites/${id}?favorite=${favorites}`,null)
  }
}
