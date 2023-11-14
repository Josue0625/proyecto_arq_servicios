import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProductServiceService } from '../../product-service.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{

  elemento : any = [];

  constructor(private serPro: ProductServiceService) {}

  ngOnInit() {
    this.serPro.elemento$.subscribe(elemento => {
      this.elemento = elemento;
      console.log(this.elemento);
    });
  }

}
