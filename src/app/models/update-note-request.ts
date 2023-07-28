import {NoteType} from "./note-type";

export interface UpdateNoteRequest {
  title:string,
  description:string,
  noteType:NoteType,
  isLocked:boolean,
  password:string

}
