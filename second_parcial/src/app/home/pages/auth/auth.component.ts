import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../../app.component';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
