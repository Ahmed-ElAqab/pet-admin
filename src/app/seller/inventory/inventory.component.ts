import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product.model';
import { Rate } from 'src/app/model/Rate.model';
import { SellerService } from 'src/app/service/seller/seller.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  sellerId: number;
  productList: Product[];

  constructor(
    private sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.sellerId = 1;

    this.sellerService.getSellerProducts(this.sellerId).subscribe(products => this.productList = products);
  }

  getAvgRate(rates: Rate[]): any {
    let rate = Math.floor(rates.map(rate => rate.rateNumber).reduce((p, c) => p + c, 0) / rates.length);

    return  Number.isNaN(rate) ? "-" : rate;

  }

}
