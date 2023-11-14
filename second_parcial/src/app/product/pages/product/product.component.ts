import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProductsComponent } from '../../components/get-all-products/get-all-products.component';
import { ProductServiceService } from '../../product-service.service';
import {MatIconModule} from '@angular/material/icon'
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../../home/auth.service';
import { HeaderComponent } from '../../../public/header/header.component';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, GetAllProductsComponent, MatIconModule, HeaderComponent, MatDialogModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {

  elementos : any = [];
  elemento : any = [];

  constructor(private ser: AuthService, private productService: ProductServiceService, private snackBar: MatSnackBar, 
    private http : HttpClient, public dialog: MatDialog){}

  ngOnInit(){
    this.get_all_products();
    this.showAlertLogin();
  }

  /* onClickNO(): void {
    this.dialogRef.close();
  } */

  /* openLogging(): void {
    const dialogRef = this.dialog.open(ProductComponent,{
      width:"500px",
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
      if(res){
        console.log("entro");
      }
    })
  } */

  async searchById(id: any){
    await this.productService.getOne(id).subscribe((res : any)=>{
      this.elemento = res
      this.productService.setElemento(res);
      console.log(res)
      const dialogRef = this.dialog.open(ModalComponent);
      dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
      });
    })
    
  }

  showAlertLogin(){
    this.snackBar.open("Login Successful", "👍", {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ['green-snackbar']
     });
  }

  async get_all_products(){
    await this.productService.getAll().subscribe((res : any)=>{
      this.elementos = res
      console.log(res)
    })
    console.log(this.elementos)
  }

}
