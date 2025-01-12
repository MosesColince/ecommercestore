import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../prodhandle.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(Number(id)).subscribe((data: any) => {
      this.product = data;
    });
  }


  editProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/edit-product', id]);
  }

  deleteProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.deleteProduct(Number(id)).subscribe(() => {
      console.log('Product deleted successfully');
      this.router.navigate(['/products']); 
    });
  }
}

