import { Address } from './Address.model';

export class UserSignUp {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address = new Address();
  role: string;
  userName: string;
  gender: string;
  birthDate: Date;
  password: string;

  constructor() {
  }
}
