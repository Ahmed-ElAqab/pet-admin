import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryComponent } from './inventory/inventory.component';

import { SellerRoutingModule } from './seller-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { ProductEditDetailsComponent } from './product-edit-details/product-edit-details.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    InventoryComponent,
    ProductDetailsComponent,
    ProductEditDetailsComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        SellerRoutingModule,
        NgxPaginationModule
    ]
})
export class SellerModule { }
