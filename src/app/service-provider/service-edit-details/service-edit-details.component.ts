import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServiceType} from '../../model/ServiceType.model';
import {Service} from '../../model/Service.model';

@Component({
  selector: 'app-service-edit-details',
  templateUrl: './service-edit-details.component.html',
  styleUrls: ['./service-edit-details.component.css']
})
export class ServiceEditDetailsComponent implements OnInit {

  @Input('types') types: ServiceType[];
  @Input('service') service: Service;
  @Output('update') update = new EventEmitter<{ service: Service, image: File }>();
  selectedImages: File;

  constructor() {
  }

  ngOnInit(): void {
  }

  updateService(service: Service): void {
    service = Object.assign(this.service, service);
    service.type = {id: service.type.id, name: service.type.name};
    this.update.emit({service, image: this.selectedImages});
    document.getElementById('editModalCloseBtn').click();
  }

  changeImages(imageChooser: any): void {
    this.selectedImages = imageChooser.files[0];
    const reader = new FileReader();
    reader.onload = event => this.service.imageUrl =  event.target.result as string;
    reader.readAsDataURL(this.selectedImages);
  }

  resetForm(): void {
    this.selectedImages = undefined;
  }

}
