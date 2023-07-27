import {Injectable, OnDestroy} from '@angular/core';
import {LoginCredentials} from "../models/login-credentials";
import {HttpClient} from "@angular/common/http";
import {CustomResponse} from "../models/custom-response";
import {ApiConfiguration} from "../config/api-configuration";
import {BehaviorSubject, catchError, firstValueFrom} from "rxjs";
import {LoginResponse} from "../models/login-response";
import {RegisterCredentials} from "../models/register-credentials";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogin$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) {

  }

  public  login(credentials:LoginCredentials){

      // await firstValueFrom(this.http.post<CustomResponse>(`${ApiConfiguration.authUrl}/signin`, credentials)).then(response=>{
      //     let loginResponse= <LoginResponse> response.data;
      //     localStorage.setItem('refresh_token',loginResponse.refresh_token);
      //     localStorage.setItem('access_token',loginResponse.jwt);
      //     this.isLogin$.next(true);
      //
      // });
    return this.http.post<CustomResponse>(`${ApiConfiguration.authUrl}/signin`, credentials)

  }

  logout() {
    this.isLogin$.next(false);
    localStorage.clear();

  }

   signup(credentials: RegisterCredentials) {
    return this.http.post(`${ApiConfiguration.authUrl}/signup`,credentials)
  }


}


