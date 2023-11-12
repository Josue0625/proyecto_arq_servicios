import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../interceptor/auth.interceptor';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [AuthService]

})
export class FormComponent implements OnInit {

  constructor(private fb: FormBuilder,private renderer: Renderer2, private el: ElementRef,  private ser : AuthService ) {}

  themes = [
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
    },
    {
      background: "#231F20",
      color: "#FFF",
      primaryColor: "#BB4430"
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

  obtener(){
    this.ser.getUsuario().subscribe(res=>{
      console.log("Ta bien");
      console.log(res);
    },
    (err)=>{
      console.log("error");
      console.log(err);
    })
  }  
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

  submit(){
    this.ser.getToken(this.form.value).subscribe(
      (res:any)=>{
      localStorage.setItem('access_token', res.access_token);
    }, 
    err => {
      console.log(err)
    }
    )
  } 

}