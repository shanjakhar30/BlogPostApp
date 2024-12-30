import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../assets/adminlte/css/adminlte.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginModel: any = {};

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    // Initialize the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Password validation
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      this.loginModel.Email = this.loginForm.value.email; 
      this.loginModel.Password = this.loginForm.value.password;
      this.accountService.loginUser(this.loginModel).subscribe({
        next: (response) => {  
          sessionStorage.setItem('UserId', response.id); 
          sessionStorage.setItem('Name', response.name); 
          sessionStorage.setItem('Email', response.email); 
          sessionStorage.setItem('Token', response.token); 
          console.log('Login successful:', response); 
          window.alert('Login successful!'); 
          this.router.navigate(['/']);
        },
        error: (error) => { 
          console.error('Login failed:', error);
        },
      });
      // Perform login action, e.g., call an API to authenticate
    } else {
      console.log('Form is invalid');
    }
  }
}
