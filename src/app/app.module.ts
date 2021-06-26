import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { APP_BASE_HREF } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NewAdminComponent } from './new-admin/new-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsBoardComponent } from './products-board/products-board.component';
import { ServicesBoardComponent } from './services-board/services-board.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { SellersBoardComponent } from './sellers-board/sellers-board.component';
import { CustomersBoardComponent } from './customers-board/customers-board.component';
import { ServiceProvidersBoardComponent } from './service-providers-board/service-providers-board.component';
import { AdminsBoardComponent } from './admins-board/admins-board.component';
export function getToken(): string {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
    LayoutComponent,
    LoginComponent,
    SignupComponent,
    NewAdminComponent,
    DashboardComponent,
    ProductsBoardComponent,
    ServicesBoardComponent,
    ImageViewerComponent,
    SellersBoardComponent,
    CustomersBoardComponent,
    ServiceProvidersBoardComponent,
    AdminsBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    })
  ],
  providers: [
    [{provide: APP_BASE_HREF, useValue: ''},
          JwtHelperService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
