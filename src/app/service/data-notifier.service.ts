import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

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
