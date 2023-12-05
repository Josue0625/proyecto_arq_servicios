import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service'; 
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',

})
export class FormComponent implements OnInit {

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef,
    private ser : AuthService,
    private snackBar: MatSnackBar
    ) {}

  themes = [
    {
      background: "#231F20",
      color: "#FFF",
      primaryColor: "#BB4430"
    },
    {
      background: "#1A1A2E",
      color: "#FFFFFF",
      primaryColor: "#0F3460"
    },
    {
      background: "#461220",
      color: "#FFFFFF",
      primaryColor: "#E94560"
    },
    {
      background: "#192A51",
      color: "#FFFFFF",
      primaryColor: "#967AA1"
    }
  ];

  ngOnInit() {
    this.setTheme(this.themes[0]);
    this.displayThemeButtons();
  }

  setTheme(theme: any) {
    const root = this.el.nativeElement.ownerDocument.querySelector(":root") as HTMLElement;
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--color", theme.color);
    root.style.setProperty("--primary-color", theme.primaryColor);
    // Considera añadir una propiedad glassColor a tu objeto theme
    // y setearla si es necesario.
    // root.style.setProperty("--glass-color", theme.glassColor);
  }

  displayThemeButtons() {
    const btnContainer = this.el.nativeElement.querySelector('.theme-btn-container');

    btnContainer.innerHTML = '';
    
    this.themes.forEach((theme) => {
      const div = this.renderer.createElement('div');
      this.renderer.addClass(div, 'theme-btn');
      this.renderer.setStyle(div, 'background', theme.background);
      this.renderer.setStyle(div, 'width', '25px');
      this.renderer.setStyle(div, 'height', '25px');
      this.renderer.appendChild(btnContainer, div);

      this.renderer.listen(div, 'click', () => this.setTheme(theme));
    });
  }


  //Formulario reactivo

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email ]],
    password: ['', [Validators.required]]
  })

   
  /* async obtener() {
    try {
      const res = await this.ser.getUsuario().toPromise();
      console.log("Ta bien");
      console.log(res);
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  } */

  async submit(){
    await this.ser.getToken(this.form.value).subscribe(
      (res:any)=>{
      if(localStorage !== undefined){
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('user_name', res.name);
        localStorage.setItem('user_avatar', res.avatar);
      }
      this.sucessAlertLogin();
      this.router.navigate(['/product']);
    }, 
    err => {
      this.errorAlertLogin();
    }
    )
    this.form.reset();

  } 

  sucessAlertLogin(){
    this.snackBar.open("Login Successful", "👍", {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ['green-snackbar']
     });
  }

  errorAlertLogin(){
    this.snackBar.open("Login Failed", "👎", {
      duration: 3000,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ['error-snackbar']
     });
  }

}