import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if(localStorage.getItem('authToken')){
      this.router.navigate(['/dashboard'])
    }
  }

  

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

      this.auth.loginUser(loginData).subscribe((res:any)=>{
        localStorage.setItem('authToken',res?.data?.token)
        if(res.data.token){
          this.router.navigate(['/dashboard']);
        }
        console.log("llllllllllllllllllll",res.data)
      })
      console.log('Form Submitted!', this.loginForm.value);
      // Implement your login logic here
    }
  }


  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
