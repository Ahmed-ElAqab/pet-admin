import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/model/Brand.model';
import { Category } from 'src/app/model/Category.model';
import { Species } from 'src/app/model/Species.model';
import { BrandService } from 'src/app/service/brand/brand.service';
import { CategoryService } from 'src/app/service/category/category.service';
import { SpeciesService } from 'src/app/service/species/species.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  categoryList:Category[];
  brandList:Brand[];
  speciesList:Species[];

  constructor(
    private categoryService:CategoryService,
    private brandService:BrandService,
    private speciesService:SpeciesService,

  ) { }

  ngOnInit(): void {

    this.categoryService.getAllCategory().subscribe(categories=>this.categoryList=categories);
    this.brandService.getAllBrands().subscribe(brands=>this.brandList=brands);
    this.speciesService.getAllSpecies().subscribe(species=>this.speciesList=species);

  }

  test(ay7aga:any): void{
    console.log(ay7aga)
  }

}
