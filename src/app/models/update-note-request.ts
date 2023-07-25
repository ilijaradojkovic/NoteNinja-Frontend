import {NoteType} from "./note-type";

export interface UpdateNoteRequest {
  title:string,
  description:string,
  noteType:NoteType

}
