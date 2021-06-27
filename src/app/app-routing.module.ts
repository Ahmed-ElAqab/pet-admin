import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { NewAdminComponent } from './new-admin/new-admin.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import {AdminGuardsGuard} from "./guards/admin/admin-guards.guard";
import {SellerGuard} from "./guards/seller/seller.guard";
import {AuthenticationGuard} from "./guards/authenticate/authentication.guard";
import {ServiceProviderService} from "./service/serviceProvider/service-provider.service";

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: "", component:DashboardComponent, canActivate:[AuthenticationGuard,AdminGuardsGuard]},
      { path: 'seller', loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule), canActivate:[AuthenticationGuard,SellerGuard]},
      { path: "new-user-admin", component:NewAdminComponent, canActivate:[AuthenticationGuard,AdminGuardsGuard]},
      { path: "dashboard", component:DashboardComponent, canActivate:[AuthenticationGuard,AdminGuardsGuard]},
      { path: "dashboard", component:DashboardComponent, canActivate:[AuthenticationGuard,ServiceProviderService]}
    ],

  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
