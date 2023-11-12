import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo:'/home'},
  {path: 'home', loadChildren : ()=> {return import("./home/home.module").then(res=>res.HomeModule)}},
];
