import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryComponent } from './inventory/inventory.component';

import { SellerRoutingModule } from './seller-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InventoryComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SellerRoutingModule
  ]
})
export class SellerModule { }
