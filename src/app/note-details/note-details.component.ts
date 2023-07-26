import {Component, Input, OnInit} from '@angular/core';
import {NoteType} from "../models/note-type";
import {Note} from "../models/note";
import {ActivatedRoute, Router} from "@angular/router";
import {NoteDetails} from "../models/note-details";
import {CustomResponse} from "../models/custom-response";
import {NgForm} from "@angular/forms";
import {NotesService} from "../service/notes.service";
import {UpdateNoteRequest} from "../models/update-note-request";
import {AlertService} from "../service/alert.service";

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit{

  note:NoteDetails=null;
  protected readonly NoteType = NoteType;


  constructor(private alertService:AlertService,private activeRoute:ActivatedRoute,private router:Router,private noteService:NotesService) {
  }
  ngOnInit(): void {
    this.activeRoute.data.subscribe(note=>{
      this.note=note["note"].data["note"] as NoteDetails;
      // console.log(this.note);
    })
  }


  updateNote(myform: NgForm) {
      // console.log(myform.value)
      this.noteService.updateNote(myform.value as UpdateNoteRequest,this.note.id).subscribe(
        response=>{

        },
            (error)=>{
          console.log(error);
              this.alertService.showAlert({message:'error',isError:true})

            },
        ()=>{
          this.alertService.showAlert({message:'Succesffully updated note!',isError:false})
        }


      )
  }

  back() {
    this.router.navigate(['notes'])
  }
}
