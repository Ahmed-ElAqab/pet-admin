import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProviderDashboardComponent} from './provider-dashboard/provider-dashboard.component';
import {AuthenticationGuard} from '../guards/authenticate/authentication.guard';
import {ServiceProviderGuard} from '../guards/serviceProvider/service-provider.guard';

const routes: Routes = [
  {path: '', component: ProviderDashboardComponent, canActivate: [AuthenticationGuard, ServiceProviderGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProviderRoutingModule {
}
