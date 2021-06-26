import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ServiceProvider} from 'src/app/model/ServiceProvider.model';
import {environment} from 'src/environments/environment';
import {Services} from '../../model/Services.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {
  private url = environment.apiUrl + 'serviceproviders';

  constructor(private httpClient: HttpClient) {
  }

  getAllServiceProviders(): Observable<ServiceProvider[]> {
    return this.httpClient.get<ServiceProvider[]>(this.url);
  }

  getServiceProvider(id: number): Observable<ServiceProvider> {
    return this.httpClient.get<ServiceProvider>(this.url + '/' + id);
  }

  getServiceProviderServices(id: number, page?: number, pageLimit?: number): Observable<Services> {
    let parameters = new HttpParams();
    if (page !== undefined && pageLimit !== undefined) {
      parameters = parameters.append('page', page.toString()).append('pageLimit', pageLimit.toString());
    }
    return this.httpClient.get<Services>(this.url + '/' + id + '/services', { params: parameters });
  }

  addNewServiceProvider(serviceProvider: ServiceProvider): Observable<ServiceProvider> {
    return this.httpClient.post<ServiceProvider>(this.url, serviceProvider);
  }

  updateServiceProvider(serviceProvider: ServiceProvider): Observable<ServiceProvider> {
    return this.httpClient.post<ServiceProvider>(this.url + '/' + serviceProvider.id, serviceProvider);
  }

  deleteServiceProvider(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  deleteAllServiceProviders(): Observable<any> {
    return this.httpClient.delete(this.url);
  }


}
