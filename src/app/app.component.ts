import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'NoteNinja-Frontend';

  constructor(private authService:AuthService,private router:Router) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem("access_token");
    if(token){
      this.authService.isLogin$.next(true)
      this.router.navigate(['notes'])
    }
    else{
      this.authService.isLogin$.next(false)
      this.router.navigate(['login'])


    }
  }



}
