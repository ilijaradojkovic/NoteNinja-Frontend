import { Component } from '@angular/core';
import {LoginCredentials} from "../models/login-credentials";
import {AnimationOptions} from "ngx-lottie";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {RegisterCredentials} from "../models/register-credentials";

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private credentials:RegisterCredentials;
  public loading=false;
  options: AnimationOptions = {
    path: '/assets/lottie/loading.json'
  };
  constructor(private auth:AuthService,private router:Router) {
  }


  async signup(form:NgForm) {
    this.credentials= <RegisterCredentials> form.value;
    console.log(this.credentials)
    try{
      this.loading=true;
      await this.auth.signup(this.credentials)

      this.router.navigate(['login'])

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
