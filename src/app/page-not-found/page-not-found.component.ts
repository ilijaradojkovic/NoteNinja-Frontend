import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

  constructor(private router:Router,private auth:AuthService) {




  }
  navigateToNotes() {
    let isLogin = this.auth.isLogin$.getValue();
    console.log(isLogin);
    if(isLogin){
      this.router.navigate(['notes'])
    }else{
      this.router.navigate(['login'])

    }
  }
}
