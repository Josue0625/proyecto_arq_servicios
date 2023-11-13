import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProductsComponent } from '../../components/get-all-products/get-all-products.component';
import { ProductServiceService } from '../../product-service.service';
import {MatIconModule} from '@angular/material/icon'
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../../home/auth.service';
import { HeaderComponent } from '../../../public/header/header.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, GetAllProductsComponent, MatIconModule, HeaderComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {

  constructor(private ser: AuthService, private productService: ProductServiceService, private snackBar: MatSnackBar){}

  ngOnInit(){
    this.get_all_products();
    this.showAlertLogin();
  }

  showAlertLogin(){
    this.snackBar.open("Login Successful", "👍", {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ['green-snackbar']
     });
  }


  elementos : any = [];

  async get_all_products(){
    await this.productService.getAll().subscribe((res : any)=>{
      this.elementos = res
      console.log(res)
    })
    console.log(this.elementos)
  }

}
