import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/model/Product.model';
import {Rate} from 'src/app/model/Rate.model';
import {SellerService} from 'src/app/service/seller/seller.service';
import {ProductService} from '../../service/product/product.service';
import {CategoryService} from '../../service/category/category.service';
import {BrandService} from '../../service/brand/brand.service';
import {SpeciesService} from '../../service/species/species.service';
import {Category} from '../../model/Category.model';
import {Species} from '../../model/Species.model';
import {Brand} from '../../model/Brand.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  sellerId: number;
  productList: Product[];
  selectedProduct: Product;
  page = 1;
  pageLimit = 12;
  count: number;
  categories: Category[] = [];
  brands: Brand[] = [];
  species: Species[] = [];

  constructor(
    private sellerService: SellerService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private speciesService: SpeciesService
  ) {
  }

  ngOnInit(): void {
    this.sellerId = 1;
    this.getProducts();
    this.categoryService.getAllCategory().subscribe(categories => this.categories = categories);
    this.brandService.getAllBrands().subscribe(brands => this.brands = brands);
    this.speciesService.getAllSpecies().subscribe(species => this.species = species);
  }

  getAvgRate(rates: Rate[]): any {
    if (rates !== null) {
      const rating = Math.floor(rates.map(rate => rate.rateNumber).reduce((p, c) => p + c, 0) / rates.length);
      return Number.isNaN(rating) ? '-' : rating;
    } else {
      return '-';
    }
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.selectedProduct.id).subscribe(e => {
      this.getProducts();
    });
    document.getElementById('deleteModalCloseBtn').click();
  }

  addProduct(data: any): void {
    this.productService.addProductWithImages(data.images, data.product).subscribe(product => {
      const index = this.productList.findIndex(e => e.id === product.id);
      if (index !== -1) {
        this.productList[index] = product;
      } else {
        this.productList.push(product);
      }
    });
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.getProducts();
  }

  private getProducts(): void {
    this.sellerService.getSellerProducts(this.sellerId, this.page - 1, this.pageLimit).subscribe(products => {
      this.productList = products.products;
      this.count = products.count;
    });
  }

}
