import { Routes } from '@angular/router';
import { AuthComponent } from './home/pages/auth/auth.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'/home'},
  { path: 'home', component: AuthComponent }
  // {path: 'producto', canActivate:[authGuard], loadChildren : ()=> {return import("./producto/producto.module").then(res=>res.ProductoModule)}}
];