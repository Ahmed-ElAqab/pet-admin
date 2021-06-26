import {NgModule} from '@angular/core';
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

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: 'seller', loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule)},
      {path: 'provider', loadChildren: () => import('./service-provider/service-provider.module').then(m => m.ServiceProviderModule)},
      {path: 'new-user-admin', component: NewAdminComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'products', component: ProductsBoardComponent},
      {path: 'services', component: ServicesBoardComponent},
      {path: 'sellers', component: SellersBoardComponent},
      {path: 'customers', component: CustomersBoardComponent},
      {path: 'providers', component: ServiceProvidersBoardComponent},
      {path: 'admins', component: AdminsBoardComponent}
    ],
  },
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
