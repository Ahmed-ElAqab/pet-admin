import {Component, OnInit} from '@angular/core';
import {Product} from '../model/Product.model';
import {ProductService} from '../service/product/product.service';
import {Rate} from '../model/Rate.model';

@Component({
  selector: 'app-products-board',
  templateUrl: './products-board.component.html',
  styleUrls: ['./products-board.component.css']
})
export class ProductsBoardComponent implements OnInit {

  products: Product[];
  page = 1;
  pageLimit = 12;
  count: number;
  selectedImage: string;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.getProducts();
  }

  getAvgRate(rates: Rate[]): any {
    if (rates !== null) {
      const rating = Math.floor(rates.map(rate => rate.rateNumber).reduce((p, c) => p + c, 0) / rates.length);
      return Number.isNaN(rating) ? '-' : rating;
    } else {
      return '-';
    }
  }

  private getProducts(): void {
    this.productService.getProducts(this.page - 1, this.pageLimit).subscribe(response => {
      this.products = response.products;
      this.count = response.count;
    });
  }
}
