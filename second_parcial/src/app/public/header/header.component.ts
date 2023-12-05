import {Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../home/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  nombreUsuario: string = ''; 
  rutaImage: string = '';
  isProductosActive: boolean = false;  
  isAgregarActive: boolean = false;  
  isSalirActive: boolean = false; 

  constructor(private router: Router, private ser: AuthService, private route_activate: ActivatedRoute) {}

  ngOnInit(){
    this.obtener();
    if(this.route_activate.snapshot.routeConfig?.path === "add-product"){
      this.navigateTo('add-product');
    }else{
      this.navigateTo('product');
    }
  }

  obtener() {
    if(localStorage !== undefined){
      const name = localStorage.getItem('user_name');
      const avatar = localStorage.getItem('user_avatar');
      if(name){
        this.nombreUsuario = name;
      }
      if(avatar){
        this.rutaImage = avatar;
      }
      console.log(this.nombreUsuario, this.rutaImage);
    }
  } 

  navigateTo(route: string): void {
    this.router.navigate(["/"+route]);
    this.isProductosActive = route === 'product';
    this.isAgregarActive = route === 'add-product';
    this.isSalirActive = route === 'salir';
  }

  //cerrar sesión
  cerrarSesion(): void {
    this.ser.cerrarSesion();
  }
}
