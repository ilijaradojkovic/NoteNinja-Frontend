import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {AlertDto} from "./models/alert-dto";

@Injectable({
  providedIn: 'root'
})
export class DataNotifierService {

  private dataNotifierSubject = new Subject<void>();

  public alert$ = this.dataNotifierSubject.asObservable();
  constructor() { }

  notify() {
    this.dataNotifierSubject.next();
  }
}
