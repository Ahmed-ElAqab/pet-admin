import {Component, OnInit} from '@angular/core';
import {Rate} from '../../model/Rate.model';
import {Service} from '../../model/Service.model';
import {ServiceType} from '../../model/ServiceType.model';
import {ServiceTypeService} from '../../service/service-type/service-type.service';
import {ServiceService} from '../../service/service/service.service';
import {ServiceProviderService} from '../../service/serviceProvider/service-provider.service';

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit {

  providerId: number;
  serviceList: Service[];
  selectedService: Service;
  page = 1;
  pageLimit = 12;
  count: number;
  serviceTypes: ServiceType[] = [];

  constructor(
    private serviceTypeService: ServiceTypeService,
    private serviceService: ServiceService,
    private providerService: ServiceProviderService
  ) {
  }

  ngOnInit(): void {
    this.providerId = 4;
    this.getServices();
    this.serviceTypeService.getAllServicesTypes().subscribe(types => this.serviceTypes = types);
  }

  getAvgRate(rates: Rate[]): any {
    if (rates !== null) {
      const rating = Math.floor(rates.map(rate => rate.rateNumber).reduce((p, c) => p + c, 0) / rates.length);
      return Number.isNaN(rating) ? '-' : rating;
    } else {
      return '-';
    }
  }

  deleteService(): void {
    this.serviceService.deleteService(this.selectedService.id).subscribe(e => {
      this.getServices();
    });
    document.getElementById('deleteModalCloseBtn').click();
  }

  addService(data: { service: Service, image: File }): void {
    this.serviceService.addNewService(data.service, data.image).subscribe(product => {
      this.serviceList.push(product);
    });
  }

  updateService(data: { service: Service, image: File }): void {
    this.serviceService.updateService(data.service, data.image).subscribe(product => {
      const index = this.serviceList.findIndex(e => e.id === product.id);
      this.serviceList[index] = product;
    });
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.getServices();
  }

  private getServices(): void {
    this.providerService.getServiceProviderServices(this.providerId, this.page - 1, this.pageLimit).subscribe(services => {
      this.serviceList = services.services;
      this.count = services.count;
    });
  }


}
