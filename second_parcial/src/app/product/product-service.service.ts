import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = `https://api.escuelajs.co/api/v1/products`;

  getAll(){
    return this.http.get(this.baseUrl);
  }

  getOne(id : string){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  postProduct(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/`,data);
  }

}