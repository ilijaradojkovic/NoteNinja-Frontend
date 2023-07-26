import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  showAlert:boolean=false;
  @Input() message:String='';

  public toggleAlert(){
    this.showAlert=!this.showAlert
  }
}
