import { Routes } from '@angular/router';
import { AuthComponent } from './home/pages/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { ProductComponent } from './product/pages/product/product.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'/home'},
  { path: 'home', component: AuthComponent },
  {path: 'product', canActivate:[authGuard], component: ProductComponent},
  {path: 'add-product', canActivate:[authGuard], component: ProductComponent}
];