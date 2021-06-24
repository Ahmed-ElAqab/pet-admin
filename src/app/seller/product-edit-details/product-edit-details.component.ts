import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../model/Product.model';
import {Category} from '../../model/Category.model';
import {Brand} from '../../model/Brand.model';
import {Species} from '../../model/Species.model';

@Component({
  selector: 'app-product-edit-details',
  templateUrl: './product-edit-details.component.html',
  styleUrls: ['./product-edit-details.component.css']
})
export class ProductEditDetailsComponent implements OnInit {
  @Input('product') product: Product;
  @Input('categories') categoryList: Category[];
  @Input('brands') brandList: Brand[];
  @Input('species') speciesList: Species[];
  @Output('update') update = new EventEmitter<any>();
  selectedImages: File[];
  images: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  insertNewProduct(product: Product): void {
    product = Object.assign(this.product, product);
    product.category = {id: product.category.id, name: product.category.name};
    // @ts-ignore
    product.species = {id: product.species.speciesId, name: product.species.speciesName};
    // @ts-ignore
    product.seller = {id: 1};
    this.update.emit({product, images: this.selectedImages});
    document.getElementById('editModalCloseBtn').click();
  }

  changeImages(imageChooser: any): void {
    this.selectedImages = Array.from(imageChooser.files);
    for (const file of this.selectedImages) {
      const reader = new FileReader();
      reader.onload = event => this.images.push({name: file.name, url: event.target.result});
      reader.readAsDataURL(file);
    }
  }

  deleteImage(name: string): void {
    let index = this.images.findIndex(e => e.name === name);
    this.images.splice(index, 1);
    index = this.selectedImages.findIndex(e => e.name === name);
    this.selectedImages.splice(index, 1);
  }

  resetForm(): void {
    this.images = [];
    this.selectedImages = [];
  }

  deleteServerImage(image: any): void {
    if (image.hasOwnProperty('id')) {
      const index = this.product.images.findIndex(e => e.id === image.id);
      this.product.images.splice(index, 1);
    } else {
      this.deleteImage(image.name);
    }
  }
}
