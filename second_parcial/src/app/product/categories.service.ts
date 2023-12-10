import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  baseUrl = `http://107.22.41.29/api/category`;

  getAll(){
    return this.http.get(this.baseUrl)
  }
}
