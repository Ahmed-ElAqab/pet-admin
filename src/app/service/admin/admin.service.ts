import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Admin} from 'src/app/model/Admin.model';
import {environment} from 'src/environments/environment';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient, HttpParams} from '@angular/common/http';
import {Admins} from '../../model/Admins.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = environment.apiUrl + "admins";

  constructor(private httpClient: HttpClient, private _jwtHelperService: JwtHelperService) {
  }

  getAdmins(page?: number, pageLimit?: number): Observable<Admins> {
    let parameters = new HttpParams();
    if (page !== undefined && pageLimit !== undefined) {
      parameters = parameters.set('page', page.toString()).append('pageLimit', pageLimit.toString());
    }
    return this.httpClient.get<Admins>(this.url, {params: parameters});
  }

  getAdmin(id: number): Observable<Admin> {
    return this.httpClient.get<Admin>(this.url + "/" + id);
  }

  addNewAdmin(admin: Admin): Observable<Admin> {
    return this.httpClient.post<Admin>(this.url, admin);
  }

  updateAdmin(admin: Admin): Observable<Admin> {
    return this.httpClient.put<Admin>(this.url + "/" + admin.id, admin);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.httpClient.delete(this.url + "/" + id);
  }

  deleteAdmins(): Observable<any> {
    return this.httpClient.delete(this.url);
  }

  public isAdmin(): boolean {
    let TOKEN = localStorage.getItem('token');
    let role = this._jwtHelperService.decodeToken(TOKEN ? TOKEN : undefined).role[0].authority;
    return role == "ROLE_ADMIN";
  }

}
