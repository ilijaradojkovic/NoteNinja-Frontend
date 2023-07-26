import {NoteType} from "./note-type";

export interface NoteDetails {
  id:string,
  title: string,
  description: string,
  createdAt: Date,
  noteType: NoteType,
  isLocked:boolean,
  password:string
}
