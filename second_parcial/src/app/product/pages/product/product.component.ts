import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProductsComponent } from '../../components/get-all-products/get-all-products.component';
import { ProductServiceService } from '../../product-service.service';
import { AuthService } from '../../../home/auth.service';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, GetAllProductsComponent, MatIconModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  constructor(private ser: AuthService, private productService: ProductServiceService){}

  ngOnInit(){
    // this.obtener();
    this.get_all_products();
  }

  // obtener(){
  //   this.ser.getUsuario().subscribe(res=>{

  //     console.log("Ta bien");
  //     console.log(res);
  //   },
  //   (err)=>{
  //     console.log("error");
  //     console.log(err);
  //   })
  // } 

  elementos : any = [];

  async get_all_products(){
    await this.productService.getAll().subscribe((res : any)=>{
      this.elementos = res
      console.log(res)
    })
    console.log(this.elementos)
  }

}
