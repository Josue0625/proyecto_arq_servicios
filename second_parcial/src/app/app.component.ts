import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './home/pages/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './public/loader/loader.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AuthComponent, HttpClientModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'second_parcial';
}
