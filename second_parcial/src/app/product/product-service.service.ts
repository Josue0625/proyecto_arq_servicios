import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private elementoSource = new BehaviorSubject<any>(null);
  elemento$ = this.elementoSource.asObservable();
  
  constructor(private http: HttpClient) { }

  baseUrl = `https://api.escuelajs.co/api/v1/products`;

  getAll(){
    return this.http.get(this.baseUrl)
  }

  getOne(id : string){
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  postProduct(){

  }

  setElemento(elemento: any) {
    this.elementoSource.next(elemento);
  }

}