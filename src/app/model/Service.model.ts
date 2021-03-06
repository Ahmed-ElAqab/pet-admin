import {ServiceProvider} from './ServiceProvider.model';
import {ServiceType} from './ServiceType.model';
import {ServiceRate} from './ServiceRate.model';

export class Service {
  id?: number;
  name: string;
  price: number;
  description: string;
  discount: number;
  startTime: Date;
  endTime: Date;
  deliverable: boolean;
  imageUrl: string;
  provider: ServiceProvider = new ServiceProvider();
  type: ServiceType = new ServiceType();
  rates: ServiceRate[];
}
