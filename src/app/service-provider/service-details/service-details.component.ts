import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServiceType} from '../../model/ServiceType.model';
import {Service} from '../../model/Service.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {

  @Input('types') types: ServiceType[];
  @Output('insert') insert = new EventEmitter<{ service: Service, image: File }>();
  selectedImage: File;
  image: string;
  formDefaultValues = {
    name: '',
    price: '',
    discount: '',
    description: '',
    startTime: '',
    endTime: '',
    timePerService: '',
    type: '',
    deliverable: false
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  insertNewService(service: Service): void {
    service.type = {id: service.type.id, name: service.type.name};
    // @ts-ignore
    service.provider = {id: 4};
    this.insert.emit({service, image: this.selectedImage});
    document.getElementById('modalCloseBtn').click();
  }

  changeImages(imageChooser: any): void {
    this.selectedImage = imageChooser.files[0];
    const reader = new FileReader();
    reader.onload = event => this.image = event.target.result as string;
    reader.readAsDataURL(this.selectedImage);
  }

  resetForm(): void {
    this.image = undefined;
    this.selectedImage = undefined;
  }
}
