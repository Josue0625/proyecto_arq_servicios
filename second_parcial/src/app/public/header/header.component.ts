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
  usuarios: any[] = []; // Arreglo para almacenar los usuarios
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
