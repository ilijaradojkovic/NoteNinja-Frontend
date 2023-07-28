import {Component, ViewChild} from '@angular/core';
import {LoginCredentials} from "../models/login-credentials";
import {AnimationOptions} from "ngx-lottie";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {RegisterCredentials} from "../models/register-credentials";
import {AlertComponent} from "../alert/alert.component";
import {AlertService} from "../service/alert.service";
import {AlertDto} from "../models/alert-dto";
import {catchError, of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

   @ViewChild("alertComponent") alertCompoennt:AlertComponent;
  private credentials:RegisterCredentials;
  public loading=false;
  options: AnimationOptions = {
    path: '/assets/lottie/loading.json'
  };
  constructor(private alertService:AlertService,private auth:AuthService,private router:Router) {
  }

  showAlert(alertDto:AlertDto) {
    this.alertService.showAlert(alertDto);
  }
  async signup(form:NgForm) {
    this.credentials= <RegisterCredentials> form.value;

      this.loading=true;
      await this.auth.signup(this.credentials)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMsg=error.error['reason'];
            this.showAlert({message:errorMsg,isError:true});

            return throwError(()=>"Registration was not successful!");
          })
        ).subscribe(
        (response)=>{
          console.log(response)
          this.showAlert({message:'Registration success!.',isError:false});

        },
        (error)=>{
          this.showAlert({message:'Registration error!Please try again.',isError:true});
          this.loading=false;

        },
      ()=>{

        this.loading=false;
        this.router.navigate(['login'])

      }

      )
      //this.router.navigate(['login'])






  }
  lockedEyeClicked(passwordIcon: HTMLElement, passwordInput: HTMLInputElement) {
    let string = passwordInput.type==='password'? 'text':'password';
    passwordInput.type=string;
    passwordIcon.classList.toggle('fa-eye');
    passwordIcon.classList.toggle('fa-eye-slash');

  }
}
