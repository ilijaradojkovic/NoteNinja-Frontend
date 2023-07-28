import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {CustomResponse} from "../models/custom-response";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ApiConfiguration} from "../config/api-configuration";

@Injectable({
  providedIn: 'root'
})
export class  noteDetailsResolver implements Resolve<Observable<CustomResponse>>{

  constructor(private http:HttpClient) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomResponse> {


      let noteId = <string>route.params['id'];



        let password=<string>route.queryParams['password'];
      console.log(password);
      console.log(noteId);
      if(password != undefined){
        console.log("ovde1")

        return <Observable<CustomResponse>> this.http.post<CustomResponse>(ApiConfiguration.noteResourceUrl+'/'+noteId,{password:password});

      }
else {
  console.log("ovde2")
        return   <Observable<CustomResponse>> this.http.post<CustomResponse>(ApiConfiguration.noteResourceUrl+'/'+noteId,{});

      }




  }

}
