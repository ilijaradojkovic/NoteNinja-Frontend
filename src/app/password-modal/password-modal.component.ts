import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalService} from "../service/modal.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.css']
})
export class PasswordModalComponent implements OnInit,OnDestroy{

  public static  modalId="password-modal"
 @Input() public noteId="";
  public isError=false;
  public errorMessage='';
  @ViewChild("myForm") myForm:NgForm;
  constructor(private router:Router,private  modalService:ModalService){

  }

  ngOnDestroy(): void {
    this.modalService.unregister(PasswordModalComponent.modalId);

  }

  ngOnInit(): void {
    this.modalService.register(PasswordModalComponent.modalId);
  }


  enterNote(myForm: NgForm) {
    if(myForm.valid){
      console.log(this.noteId);
     this.router.navigate(['note',this.noteId],{queryParams:{'password':myForm.value['password']}}).catch((reason)=> {
       this.isError=true;
       this.errorMessage="Incorrect password!";
       //console.log(reason['error']['reason'])
     });

    }else{
      myForm.controls[0].markAsDirty()
    }

   }

  handleCloseEvent() {
    this.isError=false;
    this.errorMessage='';
    this.myForm.resetForm();
  }

  closeModal() {

    this.handleCloseEvent()
    this.modalService.closeModal(PasswordModalComponent.modalId)
  }
}
