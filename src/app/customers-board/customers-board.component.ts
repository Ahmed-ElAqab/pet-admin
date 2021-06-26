import {Component, OnInit} from '@angular/core';
import {Customer} from '../model/Customer.model';
import {CustomerService} from '../service/customer/customer.service';

@Component({
  selector: 'app-customers-board',
  templateUrl: './customers-board.component.html',
  styleUrls: ['./customers-board.component.css']
})
export class CustomersBoardComponent implements OnInit {

  customers: Customer[];
  pageLimit = 12;
  page = 1;
  count: number;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.getCustomers();
  }

  private getCustomers(): void {
    this.customerService.getCustomers(this.page - 1, this.pageLimit).subscribe(response => {
      this.customers = response.customers;
      this.count = response.count;
    });
  }
}
