import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../service/modal.service";
import {NgForm} from "@angular/forms";
import {SaveNoteRequest} from "../models/save-note-request";
import {NoteType} from "../models/note-type";
import {NotesService} from "../service/notes.service";

@Component({
  selector: 'app-save-note',
  templateUrl: './save-note.component.html',
  styleUrls: ['./save-note.component.css']
})
export class SaveNoteComponent implements OnInit,OnDestroy{

  private modalId:string='save-note-modal';
  isLockedNote:boolean=false;

  constructor(private modalService:ModalService,private noteService:NotesService) {}

  ngOnDestroy(): void {
    this.modalService.unregister(this.modalId);
  }

  ngOnInit(): void {
    this.modalService.register(this.modalId);
  }
  lockedEyeClicked(passwordIcon: HTMLElement, passwordInput: HTMLInputElement) {
    let string = passwordInput.type==='password'? 'text':'password';
    passwordInput.type=string;
    passwordIcon.classList.toggle('fa-eye');
    passwordIcon.classList.toggle('fa-eye-slash');

  }

  async  saveNote(form: NgForm) {
    let value = <SaveNoteRequest>form.value;
     await this.noteService.saveNote(value)
       .pipe(

       )
       .subscribe((x)=>{},(e)=>{},()=>{
       this.modalService.closeModal(this.modalId);
     });

  }

  protected readonly NoteType = NoteType;

  closeModal() {
    this.modalService.closeModal(this.modalId);
  }
}
