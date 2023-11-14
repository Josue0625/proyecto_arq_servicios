import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  baseUrl = `https://api.escuelajs.co/api/v1/categories`;

  getAll(){
    return this.http.get(this.baseUrl)
  }
}
