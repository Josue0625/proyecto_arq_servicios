import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormArray,
  FormGroup
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CategoriesService } from '../../categories.service';
import { ProductServiceService } from '../../product-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit {
  
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private ser: ProductServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  form = this.fb.group({
    title: ['', [Validators.required]],
    price: [0, [Validators.required]],
    description: ['', [Validators.required]],
    categoryId: [0, [Validators.required]],
    images: this.fb.array([], [Validators.required]),
  });

  form2 = this.fb.group({
    image: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.get_all_categories();
  }

  categories: any = [];

  async get_all_categories() {
    await this.categoriesService.getAll().subscribe((res: any) => {
      this.categories = res;
      console.log(res);
    });
  }


  async submit() {
      const imagesArray = this.form.get('images') as FormArray;
      const image = this.form2.value.image
      console.log(image)
      imagesArray.push(this.fb.control(image, Validators.required));
      const category = this.form.get('categoryId')?.value;
      const category_id = Number(category);
      this.form.get('categoryId')?.setValue(category_id);
      await this.ser.postProduct(this.form.value).subscribe(
        (res: any) => {
          this.sucessAlert();
          console.log(res);
          this.router.navigate(['/product']);
        },
        (err) => {
          this.errorAlert();
        }
      );
      this.form.reset();
  }

  sucessAlert() {
    this.snackBar.open('Producto Agregado', '👍', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
    });
  }

  errorAlert() {
    this.snackBar.open('Producto Fallido', '👎', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
