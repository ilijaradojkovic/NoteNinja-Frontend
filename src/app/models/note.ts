import {NoteType} from "./note-type";

export interface Note {
  id:string,
  title: string,
  description: string,
  createdAt: Date,
  noteType: NoteType,
  isFavorite:boolean

}
