import {NoteType} from "./note-type";

export interface SaveNoteRequest {
  title:string,
  description:string,
  noteType:NoteType,
  isLocked:boolean,
  password:string
}


