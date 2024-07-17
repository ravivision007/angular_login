import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);
      const formData = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        direct: true,
        first_name: this.signupForm.value.firstName,
        last_name: this.signupForm.value.lastName,
        dob: this.signupForm.value.dob,
        address: this.signupForm.value.address,
        phone_number: +this.signupForm.value.phoneNumber
      }
      const data = this.auth.signupUser(formData).subscribe((res: any) => {
        localStorage.setItem('authToken',res?.data?.token)
        if(res.data.token){
          this.router.navigate(['/dashboard']);
        }
        console.log("*************************", res)
      })
      // Implement your signup logic here
    }
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get dob() { return this.signupForm.get('dob'); }
  get address() { return this.signupForm.get('address'); }
  get phoneNumber() { return this.signupForm.get('phoneNumber'); }
}
