import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  productService = inject(ProductService);
  router = inject(Router);

  addForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('', [Validators.required]),
    isShow: new FormControl(''),
  });

  handleSubmit() {
    this.productService.addProduct(this.addForm.value).subscribe({
      next: (data) => {
        console.log(data);
        alert('Add OK');
        this.router.navigate(['/product/list']);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
