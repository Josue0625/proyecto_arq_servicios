import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://api.escuelajs.co/api/v1/auth';

  getToken(form : any){
    return this.http.post(`${this.baseUrl}/login`, form);
  }
  getUsuario(){
    return this.http.get(`${this.baseUrl}/profile`, {
    });
  }

}
