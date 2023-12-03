import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl = 'https://api.escuelajs.co/api/v1/auth';

  getToken(form : any){
    return this.http.post(`${this.baseUrl}/login`, form);
  }
  getUsuario(){
    return this.http.get(`${this.baseUrl}/profile`, {
    });
  }
  cerrarSesion(): void {
    if(localStorage !== undefined){
      localStorage.removeItem("access_token");
    }
    this.router.navigate(['/home']);
  }

}
