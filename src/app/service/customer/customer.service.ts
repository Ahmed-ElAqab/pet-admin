import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Customer} from '../../model/Customer.model';
import {Customers} from '../../model/Customers.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = environment.apiUrl + 'customers';

  constructor(private httpClient: HttpClient) {
  }

  getCustomers(page?: number, pageLimit?: number): Observable<Customers> {
    let parameters = new HttpParams();
    if (page !== undefined && pageLimit !== undefined) {
      parameters = parameters.set('page', page.toString()).append('pageLimit', pageLimit.toString());
    }
    return this.httpClient.get<Customers>(this.url, {params: parameters});
  }

  getCustomer(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(this.url + '/' + id);
  }

  getCustomerOrders(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + '/' + id + '/orders');
  }

  addNewCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.url, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.put<Customer>(this.url + '/' + customer.id, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  deleteCustomers(): Observable<any> {
    return this.httpClient.delete(this.url);
  }
}
