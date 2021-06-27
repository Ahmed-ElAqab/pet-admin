import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServiceProviderRoutingModule} from './service-provider-routing.module';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { ServiceEditDetailsComponent } from './service-edit-details/service-edit-details.component';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    ServiceDetailsComponent,
    ProviderDashboardComponent,
    ServiceEditDetailsComponent
  ],
  imports: [
    CommonModule,
    ServiceProviderRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ServiceProviderModule {
}
