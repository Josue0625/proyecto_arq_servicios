import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  // baseUrl = 'https://api.escuelajs.co/api/v1/auth';
  baseUrl = 'http://localhost:3100';

  getToken(form : any){
    return this.http.get(`${this.baseUrl}/auth?username=${form.email}&password=${form.password}`);
  }
  cerrarSesion(): void {
    if(localStorage !== undefined){
      localStorage.removeItem("access_token");
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_avatar');
    }
    this.router.navigate(['/home']);
  }

}
