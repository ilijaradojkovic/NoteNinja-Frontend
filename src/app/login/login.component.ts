import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {LoginCredentials} from "../models/login-credentials";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {DataState} from "../models/data-state";
import {catchError, delay, throwError} from "rxjs";
import {AnimationOptions} from "ngx-lottie";
import {LoginResponse} from "../models/login-response";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private credentials:LoginCredentials;
  public loading=false;
  options: AnimationOptions = {
    path: '/assets/lottie/loading.json'
  };
  public showError=false;
  public errorMessage='';
  constructor(private auth:AuthService,private router:Router) {
  }


   async login(form:NgForm) {
    this.credentials= <LoginCredentials> form.value;

      this.loading = true;
      await this.auth.login(this.credentials)
        .subscribe(response => {
        let loginResponse = <LoginResponse>response.data;
        console.log(response)

        localStorage.setItem('refresh_token', loginResponse.refresh_token);
        localStorage.setItem('access_token', loginResponse.jwt);
        this.auth.isLogin$.next(true)
      }, error => {
          this.showError = true;
          this.errorMessage = 'User does not exist! Please register.';
          this.loading = false;
      }, () => {
        this.router.navigate(['notes'])
        this.loading = false;

      });


   }
  lockedEyeClicked(passwordIcon: HTMLElement, passwordInput: HTMLInputElement) {
    let string = passwordInput.type==='password'? 'text':'password';
    passwordInput.type=string;
    passwordIcon.classList.toggle('fa-eye');
    passwordIcon.classList.toggle('fa-eye-slash');

  }
}
