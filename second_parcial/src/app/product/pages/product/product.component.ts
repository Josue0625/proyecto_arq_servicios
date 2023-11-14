import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProductsComponent } from '../../components/get-all-products/get-all-products.component';
import { ProductServiceService } from '../../product-service.service';
import {MatIconModule} from '@angular/material/icon'
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../../home/auth.service';
import { HeaderComponent } from '../../../public/header/header.component';
import { AddProductComponent } from '../../components/add-product/add-product.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalDeleteComponent } from '../../components/modal-delete/modal-delete.component';
import { ModalUpdateComponent } from '../../components/modal-update/modal-update.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, GetAllProductsComponent, MatIconModule, HeaderComponent, AddProductComponent,  MatDialogModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {

  elementos : any = [];
  elemento : any = [];

  constructor(private ser: AuthService, private productService: ProductServiceService, private snackBar: MatSnackBar, 
    private http : HttpClient, public dialog: MatDialog, private route: ActivatedRoute){}

  ngOnInit(){
    this.get_all_products();
  }

  esRutaProduct(): boolean {
    return this.route.snapshot.routeConfig?.path === 'product';
  }

  esRutaAddProduct(): boolean {
    return this.route.snapshot.routeConfig?.path === 'add-product';
  }

  async searchById(id: any, index: any){
    await this.productService.getOne(id).subscribe((res : any)=>{
      this.elemento = res
      this.productService.setElemento(res);
      console.log(res)
      if(index == 1){
        const dialogRef = this.dialog.open(ModalComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
      } else if(index==2){
        const dialogRef = this.dialog.open(ModalUpdateComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
      } else if(index == 3){
        const dialogRef = this.dialog.open(ModalDeleteComponent);
        dialogRef.afterClosed().subscribe(result => {
          // Actualizar productos después de cerrar la modal
          if (result) {
            
            this.get_all_products();
          }
        });
      }
    })
    
  }

  async get_all_products(){
    await this.productService.getAll().subscribe((res : any)=>{
      this.elementos = res
      console.log(res)
    })
    console.log(this.elementos)
  }

}
