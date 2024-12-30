import { Component } from '@angular/core'; 
import { User } from './../../models/user.model';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../assets/adminlte/css/adminlte.css']
})
export class RegisterComponent {
  user: User = new User('', '', '');
  

  constructor(private accountService: AccountService) { 
  }

  onSubmit(form: any): void {
    if (form.valid) { 
      console.log('User:', this.user);
      this.accountService.registerUser(this.user).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.user.Name = this.user.Email = this.user.Password ='';
          window.alert('Registration successful!'); 
        },
        error: (error) => { 
          console.error('Registration failed:', error);
        },
      });
      // You can proceed to send the form data to an API here
    } else {
      console.log('Form is invalid!');
    }
  }
}