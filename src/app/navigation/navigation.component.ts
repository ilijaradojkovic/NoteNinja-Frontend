import {Component} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {


  constructor(public authService:AuthService,private router:Router) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }

  handleLogoClick() {
      if(this.authService.isLogin$.getValue()){
        this.router.navigate(['notes'])
      }else{
        this.router.navigate(['login'])
      }
  }
}
