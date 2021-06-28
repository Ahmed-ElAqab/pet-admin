import {NgModule} from '@angular/core';
import {AdminGuardsGuard} from "./guards/admin/admin-guards.guard";
import {SellerGuard} from "./guards/seller/seller.guard";
import {AuthenticationGuard} from "./guards/authenticate/authentication.guard";
import {ServiceProviderService} from "./service/serviceProvider/service-provider.service";
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LayoutComponent} from './layout/layout.component';
import {LoginComponent} from './login/login.component';
import {NewAdminComponent} from './new-admin/new-admin.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SignupComponent} from './signup/signup.component';
import {ProductsBoardComponent} from './products-board/products-board.component';
import {ServicesBoardComponent} from './services-board/services-board.component';
import {SellersBoardComponent} from './sellers-board/sellers-board.component';
import {CustomersBoardComponent} from './customers-board/customers-board.component';
import {ServiceProvidersBoardComponent} from './service-providers-board/service-providers-board.component';
import {AdminsBoardComponent} from './admins-board/admins-board.component';
import {ServiceProviderGuard} from './guards/serviceProvider/service-provider.guard';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: "", component: DashboardComponent, canActivate: [AuthenticationGuard, AdminGuardsGuard]},
      {
        path: 'seller',
        loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule),
        canActivate: [AuthenticationGuard, SellerGuard]
      },
      {path: "new-user-admin", component: NewAdminComponent, canActivate: [AuthenticationGuard, AdminGuardsGuard]},
      {path: "dashboard", component: DashboardComponent, canActivate: [AuthenticationGuard, AdminGuardsGuard]},
      {
        path: 'provider',
        loadChildren: () => import('./service-provider/service-provider.module').then(m => m.ServiceProviderModule),
        canActivate: [AuthenticationGuard, ServiceProviderGuard]
      },
      {path: 'new-user-admin', component: NewAdminComponent, canActivate: [AuthenticationGuard, AdminGuardsGuard]},
      {path: 'products', component: ProductsBoardComponent, canActivate: [AuthenticationGuard, AdminGuardsGuard]},
      {path: 'services', component: ServicesBoardComponent, canActivate: [AuthenticationGuard, AdminGuardsGuard]},
      {path: 'sellers', component: SellersBoardComponent, canActivate: [AuthenticationGuard, AdminGuardsGuard]},
      {path: 'customers', component: CustomersBoardComponent, canActivate: [AuthenticationGuard, AdminGuardsGuard]},
      {
        path: 'providers',
        component: ServiceProvidersBoardComponent,
        canActivate: [AuthenticationGuard, AdminGuardsGuard]
      },
      {path: 'admins', component: AdminsBoardComponent, canActivate: [AuthenticationGuard, AdminGuardsGuard]}],
  },
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
