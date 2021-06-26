import { Address } from './Address.model';

export class ServiceProvider {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: Address = new Address();
  role: string;
  userName: string;
  gender: string;
  birthDate: Date;

  constructor() {
  }
}
