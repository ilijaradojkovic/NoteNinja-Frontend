import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {LoginCredentials} from "../models/login-credentials";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {DataState} from "../models/data-state";
import {delay} from "rxjs";
import {AnimationOptions} from "ngx-lottie";


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
  constructor(private auth:AuthService,private router:Router) {
  }


   async login(form:NgForm) {
    this.credentials= <LoginCredentials> form.value;
    try{
      this.loading=true;
      await this.auth.login(this.credentials)

       this.router.navigate(['notes'])

    }catch (e){
      console.log(e);
    }
    finally {
      this.loading=false;
    }




   }
  lockedEyeClicked(passwordIcon: HTMLElement, passwordInput: HTMLInputElement) {
    let string = passwordInput.type==='password'? 'text':'password';
    passwordInput.type=string;
    passwordIcon.classList.toggle('fa-eye');
    passwordIcon.classList.toggle('fa-eye-slash');

  }
}
