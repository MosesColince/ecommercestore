import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../prodhandle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../product.model'; 

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  product: Product = {
    id: 0, 
    title: '',
    description: '',
    price: 0,
    category: '',
    rating: {
      rate: 0, 
      count: 0, 
    } };

  isEditMode: boolean = false;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getProductById(Number(id)).subscribe((data: Product) => {
        this.product = data;
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id!, this.product).subscribe(
        () => this.router.navigate(['/products']),
        (error) => console.error('Error updating product:', error)
      );
    } else {
      this.productService.addProduct(this.product).subscribe(
        () => this.router.navigate(['/products']),
        (error) => console.error('Error adding product:', error)
      );
    }
  }

 deleteProduct() {
    if (this.isEditMode) {
      this.productService.deleteProduct(this.product.id!).subscribe(
        () => {
          console.log('Product deleted successfully');
          this.router.navigate(['/products']);
        },
        (error) => console.error('Error deleting product:', error)
      );
    }
  }
}
