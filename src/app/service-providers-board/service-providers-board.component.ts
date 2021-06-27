import {Component, OnInit} from '@angular/core';
import {ServiceProviderService} from '../service/serviceProvider/service-provider.service';
import {ServiceProvider} from '../model/ServiceProvider.model';

@Component({
  selector: 'app-service-providers-board',
  templateUrl: './service-providers-board.component.html',
  styleUrls: ['./service-providers-board.component.css']
})
export class ServiceProvidersBoardComponent implements OnInit {

  providers: ServiceProvider[];
  pageLimit = 12;
  page = 1;
  count: number;

  constructor(private providerService: ServiceProviderService) {
  }

  ngOnInit(): void {
    this.getProviders();
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.getProviders();
  }

  private getProviders(): void {
    this.providerService.getAllServiceProviders(this.page - 1, this.pageLimit).subscribe(response => {
      this.providers = response.providers;
      this.count = response.count;
    });
  }
}
