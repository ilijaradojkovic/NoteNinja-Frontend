import {Component, ElementRef, Input} from '@angular/core';
import {ModalService} from "../service/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() modalid='';
  @Input() title='';


  constructor(public modalService:ModalService) {
  }

  isModalOpen(){
    let b = this.modalService.isModalOpen(this.modalid);
    return !b;
  }
  closeModal($event: Event) {
    $event.preventDefault();
    this.modalService.closeModal(this.modalid);
  }
}
