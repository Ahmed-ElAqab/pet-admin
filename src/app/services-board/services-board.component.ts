import {Component, OnInit} from '@angular/core';
import {Service} from '../model/Service.model';
import {ServiceService} from '../service/service/service.service';
import {Rate} from '../model/Rate.model';

@Component({
  selector: 'app-services-board',
  templateUrl: './services-board.component.html',
  styleUrls: ['./services-board.component.css']
})
export class ServicesBoardComponent implements OnInit {

  services: Service[];
  page = 1;
  pageLimit = 12;
  count: number;
  selectedImage: string;

  constructor(private serviceService: ServiceService) {
  }

  ngOnInit(): void {
    this.getServices();
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.getServices();
  }

  getAvgRate(rates: Rate[]): number | string {
    if (rates !== null) {
      const rating = Math.floor(rates.map(rate => rate.rateNumber).reduce((p, c) => p + c, 0) / rates.length);
      return Number.isNaN(rating) ? '-' : rating;
    } else {
      return '-';
    }
  }

  private getServices(): void {
    this.serviceService.getAllServices(this.page - 1, this.pageLimit).subscribe(response => {
      this.services = response.services;
      this.count = response.count;
    });
  }
}
