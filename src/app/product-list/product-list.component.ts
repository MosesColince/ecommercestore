import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../prodhandle.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isTestMode = true;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        if (this.isTestMode || data.length === 0) {
          const newProduct: Product = {
            id: 1,
            title: 'Sample Product',
            price: 29.99,
            description: 'This is a sample product description.',
            category: 'electronics',
            rating: {
              rate: 4.5,
              count: 120,
            },
          };
          this.products = [...data, newProduct];
        } else {
          this.products = data;
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.products = [
          {
            id: 1,
            title: 'Sample Product',
            price: 29.99,
            description: 'This is a sample product description.',
            category: 'electronics',
            rating: {
              rate: 4.5,
              count: 120,
            },
          },
        ];
      },
      complete: () => {
        console.log('Product fetch complete.');
      },
    });
  }

  selectProduct(id: number) {
    this.router.navigate(['/products', id]);
  }
}
