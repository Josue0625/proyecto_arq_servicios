import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductServiceService } from '../../product-service.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss'
})
export class ModalDeleteComponent implements OnInit{

  elemento : any = [];

  constructor(private serPro: ProductServiceService, private snackBar: MatSnackBar, private router : Router) {}

  ngOnInit() {
    this.serPro.elemento$.subscribe(elemento => {
      this.elemento = elemento.data;
      console.log(this.elemento);
    });
  }

  deleteProduct(id:any){
    
    this.serPro.deleteProduct(id).subscribe(
      (res: any) => {
        this.sucessAlert();
        console.log(res);
      },
      (err) => {
        this.errorAlert();
      }
    );
  }

  sucessAlert() {
    this.snackBar.open('Producto Eliminado', '👍', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
    });
  }

  errorAlert() {
    this.snackBar.open('Producto No eliminado', '👎', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

}
