import {ActivatedRouteSnapshot, Resolve,RouterStateSnapshot} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {CustomResponse} from "../models/custom-response";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ApiConfiguration} from "../config/api-configuration";
import {KeyService} from "../service/key.service";
@Injectable({
  providedIn: 'root'
})
export class  noteDetailsResolver implements Resolve<Observable<CustomResponse>>{

  constructor(private http:HttpClient,private keyService:KeyService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomResponse> {


      let noteId = <string>route.params['id'];
      // let isLocked=<boolean>route.queryParams['isLocked'];


      // if(isLocked){
      //   let password=<string>route.queryParams['password'];
      //   let s = this.keyService.encryptString(password);
      //
      //   return <Observable<CustomResponse>> this.http.post<CustomResponse>(ApiConfiguration.noteResourceUrl+'/'+noteId,{password:s});
      // }

      return   <Observable<CustomResponse>> this.http.get<CustomResponse>(ApiConfiguration.noteResourceUrl+'/'+noteId);



  }

}
