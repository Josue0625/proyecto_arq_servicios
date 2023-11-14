import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductServiceService } from '../../product-service.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormArray
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CategoriesService } from '../../categories.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './modal-update.component.html',
  styleUrl: './modal-update.component.scss'
})
export class ModalUpdateComponent implements OnInit {

  elemento : any = [];
  update_product : any = [];
  form: FormGroup;
  form2: FormGroup;

  constructor(
    private serPro: ProductServiceService,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {
      this.form = this.fb.group({
        title: ['', [Validators.required]],
        price: [0, [Validators.required]],
        description: ['', [Validators.required]],
        categoryId: [0, [Validators.required]],
        images: this.fb.array([], [Validators.required]),
      });
      this.form2 = this.fb.group({
        image: ['', [Validators.required]],
      });
    }

  ngOnInit() {
    this.get_all_categories_elements();
  }

  categories: any = [];

  async get_all_categories_elements() {
    await this.categoriesService.getAll().subscribe((res: any) => {
      this.categories = res;
      console.log(res);
    });
    await this.serPro.elemento$.subscribe(elemento => {
      this.elemento = elemento;
      this.form.patchValue({
        title: elemento.title,
        price: elemento.price,
        description: elemento.description,
        categoryId: elemento.category.id
      });
      this.form2.patchValue({
        image: elemento.images[0]
      });
      console.log(this.elemento);
    });
  }

  async submit(){
    const imagesArray = this.form.get('images') as FormArray;
      const image = this.form2.value.image
      imagesArray.push(this.fb.control(image, Validators.required));
      const category = this.form.get('categoryId')?.value;
      const category_id = Number(category);
      this.form.get('categoryId')?.setValue(category_id);
      await this.serPro.updateProduct(this.elemento.id,this.form.value).subscribe((res : any)=>{
        this.update_product = res
        console.log(res)
      })
      console.log(this.update_product)
  }

}
