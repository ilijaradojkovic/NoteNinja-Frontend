import {ActivatedRouteSnapshot, Resolve, ResolveFn, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {CustomResponse} from "../models/custom-response";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class  noteDetailsResolver implements Resolve<Observable<CustomResponse>>{

  constructor(private http:HttpClient) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomResponse> {


      let noteId = <string>route.params['id'];

      return   <Observable<CustomResponse>> this.http.get<CustomResponse>(`http://localhost:8080/notes/`+noteId);;



  }

}
