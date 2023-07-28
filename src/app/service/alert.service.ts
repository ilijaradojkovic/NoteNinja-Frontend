import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {AlertDto} from "../models/alert-dto";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<AlertDto>();

  public alert$ = this.alertSubject.asObservable();

  showAlert(alertDto: AlertDto) {
    this.alertSubject.next(alertDto);
  }
}
