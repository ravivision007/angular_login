import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router:Router,
    private auth : AuthService
  ){}

  profile:any;

  ngOnInit() {
    if(!localStorage.getItem('authToken')){
      this.router.navigate(['/login'])
    }else{
      const token = localStorage.getItem('authToken')
      this.auth.getProfile(token).subscribe((res:any)=>{
        this.profile = res.data
      })
    }
  }

  logout(){
    localStorage.removeItem('authToken')
    this.router.navigate(['/login'])
  }

}
