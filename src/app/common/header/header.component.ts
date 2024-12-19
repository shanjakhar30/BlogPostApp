import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userId: any;
  constructor(private router: Router) {}
  ngOnInit(): void { 
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.userId = sessionStorage.getItem('UserId');
      if (this.userId == null) {
        this.userId = 0;
      }
      console.log('userId ' + this.userId); 
    }
  }
  onLogOut(value: any) { 
    sessionStorage.removeItem('UserId'); 
    this.router.navigate(['/']);
  }
}
