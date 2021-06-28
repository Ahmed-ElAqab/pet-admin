import {Component, OnInit} from '@angular/core';
import {Seller} from '../model/Seller.model';
import {SellerService} from '../service/seller/seller.service';

@Component({
  selector: 'app-sellers-board',
  templateUrl: './sellers-board.component.html',
  styleUrls: ['./sellers-board.component.css']
})
export class SellersBoardComponent implements OnInit {

  sellers: Seller[] = [];
  pageLimit = 12;
  page = 1;
  count: number;

  constructor(private sellerService: SellerService) {
  }

  ngOnInit(): void {
    this.getSellers();
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.getSellers();
  }

  private getSellers(): void {
    this.sellerService.getSellers(this.page - 1, this.pageLimit).subscribe(response => {
      if (response !== null) {
      this.sellers = response.sellers;
      this.count = response.count;
      } else {
        this.sellers = [];
        this.count = 0;
      }
    });
  }
}
