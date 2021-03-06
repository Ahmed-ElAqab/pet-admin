import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Brand} from 'src/app/model/Brand.model';
import {Category} from 'src/app/model/Category.model';
import {Species} from 'src/app/model/Species.model';
import {Product} from '../../model/Product.model';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input('categories') categoryList: Category[];
  @Input('brands') brandList: Brand[];
  @Input('species') speciesList: Species[];
  @Output('insert') insert = new EventEmitter<any>();
  selectedImages: File[];
  images: any[] = [];
  formDefaultValues = {
    name: '',
    price: '',
    discount: '',
    quantity: '',
    description: '',
    category: '',
    species: '',
    brand: '',
    available: false
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  insertNewProduct(product: Product): void {
    product.category = {id: product.category.id, name: product.category.name};
    // @ts-ignore
    product.species = {id: product.species.speciesId, name: product.species.speciesName};
    // @ts-ignore
    product.seller = {id: 1};
    this.insert.emit({product, images: this.selectedImages});
    document.getElementById('modalCloseBtn').click();
  }

  changeImages(imageChooser: any): void {
    this.selectedImages = Array.from(imageChooser.files);
    this.images = [];
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
}
