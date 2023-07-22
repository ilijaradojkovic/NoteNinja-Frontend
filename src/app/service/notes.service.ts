import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {CustomResponse} from "../models/custom-response";
import {NoteType} from "../models/note-type";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private page:number=0;
  private search:string='';

  public notes$:Observable<CustomResponse>=<Observable<CustomResponse>>this.http.get<CustomResponse>(`http://localhost:8080/notes?page=${this.page}&search=${this.search}`).pipe(
    tap(console.log),
    catchError(this.handleError)
  )

  constructor(private http:HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Method not implemented')
  }

  noteTypeChanged(activeNoteType: NoteType) {
    this.notes$=this.http.get<CustomResponse>(`http://localhost:8080/notes?page=${this.page}&search=${this.search}&note_type=${activeNoteType}`).pipe(
      tap(console.log),
      catchError(this.handleError)
    )
  }
}
