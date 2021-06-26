import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ServiceType} from '../../model/ServiceType.model';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllServicesTypes(): Observable<ServiceType[]> {
    return this.httpClient.get<ServiceType[]>(`${environment.apiUrl}` + 'types');
  }
}
