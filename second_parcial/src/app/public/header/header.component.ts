import {Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private ser: AuthService) {}

  ngOnInit(){
    this.obtener();
  }
  usuarios: any[] = []; // Arreglo para almacenar los usuarios

  obtener() {
    this.ser.getUsuario().subscribe(
      (res: any) => {
        console.log(res);
        this.usuarios.push(res); // Agrega la respuesta al arreglo de usuarios
        this.nombreUsuario = res.name; // Asigna el nombre del usuario para mostrar en el HTML
        this.rutaImage = res.avatar;
        console.log(this.nombreUsuario, this.rutaImage);
      },
      (err) => {
        console.log("error");
        console.log(err);
      }
    );
  }

  isProductosActive: boolean = true;  
  isAgregarActive: boolean = false;  
  isSalirActive: boolean = false;  


  navigateTo(route: string): void {
    this.router.navigate([route]);

    this.isProductosActive = route === 'product';
    this.isAgregarActive = route === 'agregar';
    this.isSalirActive = route === 'salir';
    
  }

  //cerrar sesión
  cerrarSesion(): void {
    this.ser.cerrarSesion();
  }
}
