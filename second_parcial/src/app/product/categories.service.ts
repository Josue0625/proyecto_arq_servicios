import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  baseUrl = `http://localhost:3100/api/category`;

  getAll(){
    return this.http.get(this.baseUrl)
  }
}
