import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../home/auth.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  constructor(private ser: AuthService){}

  ngOnInit(){
    this.obtener();
  }
  obtener(){
    this.ser.getUsuario().subscribe(res=>{

      console.log("Ta bien");
      console.log(res);
    },
    (err)=>{
      console.log("error");
      console.log(err);
    })
  } 

}
