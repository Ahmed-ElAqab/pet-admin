import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path: '', component: InventoryComponent},
  {path: 'seller/:sellerId/products/:productId', component: ProductDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
