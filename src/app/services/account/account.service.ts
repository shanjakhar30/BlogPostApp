import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  token = sessionStorage.getItem('Token');
  userId = sessionStorage.getItem('UserId');
  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> { 
    const url = `${environment.apiUrl}${environment.endpoints.register}`;
    return this.http.post(url, user);
}

loginUser(user: any): Observable<any> { 
  const url = `${environment.apiUrl}${environment.endpoints.login}`;
  return this.http.post(url, user);
}
getToken(): string { 
  console.log("Token  " + this.token);
  console.log("currentUserId  " + this.userId);
  if (this.token != null) {
    return this.token; 
  }
  else {
    return '';  
  }
}
}
