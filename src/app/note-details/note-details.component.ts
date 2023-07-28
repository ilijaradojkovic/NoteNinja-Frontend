import {Component, OnInit} from '@angular/core';
import {NoteType} from "../models/note-type";
import {ActivatedRoute, Router} from "@angular/router";
import {NoteDetails} from "../models/note-details";
import {NgForm} from "@angular/forms";
import {NotesService} from "../service/notes.service";
import {UpdateNoteRequest} from "../models/update-note-request";
import {AlertService} from "../service/alert.service";
import {DataNotifierService} from "../data-notifier.service";

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit{

  note:NoteDetails=null;
  protected readonly NoteType = NoteType;



  constructor(private alertService:AlertService,private activeRoute:ActivatedRoute,private router:Router,private noteService:NotesService,private  dataNotifier:DataNotifierService) {
  }
  ngOnInit(): void {
    this.activeRoute.data.subscribe(note=>{
      this.note=note["note"].data["note"] as NoteDetails;
    })
  }


  updateNote(myform: NgForm) {
      this.noteService.updateNote(myform.value as UpdateNoteRequest,this.note.id).subscribe(
        response=>{

        },
            (error)=>{
          console.log(error);
              this.alertService.showAlert({message:'error',isError:true})

            },
        ()=>{
          this.alertService.showAlert({message:'Succesffully updated note!',isError:false})
          this.dataNotifier.notify();
          this.router.navigate(['notes'])
        }


      )
  }

  back() {
    this.router.navigate(['notes'])
  }
}
