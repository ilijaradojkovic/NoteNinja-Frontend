import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from "../service/alert.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit{

  showAlert:boolean=false;
  message:String='';
  isError:boolean=false;

  constructor(private alertService:AlertService) {}




  ngOnInit(): void {
    this.alertService.alert$.subscribe(alertDto=>{
      this.message=alertDto.message;
      this.isError=alertDto.isError;
      this.showAlert=true
      setTimeout(()=>{
        this.showAlert=false;
        this.message=''
      },5000)
    })
  }
}
