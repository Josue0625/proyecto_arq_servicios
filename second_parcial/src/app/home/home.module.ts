import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/auth.interceptor';




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    
  ]
})
export class HomeModule { }
