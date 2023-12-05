import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private elementoSource = new BehaviorSubject<any>(null);
  elemento$ = this.elementoSource.asObservable();
  
  constructor(private http: HttpClient) { }

  baseUrl = `http://localhost:3100/api/producto`;

  getAll(){
    return this.http.get(this.baseUrl);
  }

  getOne(id : string){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  postProduct(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/`,data);
  }

  setElemento(elemento: any) {
    this.elementoSource.next(elemento);
  }

  deleteProduct(id : string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
  updateProduct(updated: any){
    return this.http.put(`${this.baseUrl}`, updated);
  }

}