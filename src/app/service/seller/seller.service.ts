import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Seller} from 'src/app/model/Seller.model';
import {environment} from 'src/environments/environment';
import {Products} from '../../model/Products.model';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private url = environment.apiUrl + 'sellers';

  constructor(private httpClient: HttpClient, private _jwtHelperService: JwtHelperService) {
  }

  getSellers(): Observable<Seller[]> {
    return this.httpClient.get<Seller[]>(this.url);
  }

  getSeller(id: number): Observable<Seller> {
    return this.httpClient.get<Seller>(this.url + '/' + id);
  }

  getSellerProducts(id: number, page?: number, pageLimit?: number): Observable<Products> {
    let parameters = new HttpParams();
    if (page !== undefined && pageLimit !== undefined) {
      parameters = parameters.set('page', page.toString())
        .append('pageLimit', pageLimit.toString());
    }
    return this.httpClient.get<Products>(this.url + '/' + id + '/products', {params: parameters});
  }

  addNewSeller(seller: Seller): Observable<Seller> {
    return this.httpClient.post<Seller>(this.url, seller);
  }

  updateSeller(seller: Seller): Observable<Seller> {
    return this.httpClient.put<Seller>(this.url + '/' + seller.id, seller);
  }

  deleteSeller(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  deleteSellers(): Observable<any> {
    return this.httpClient.delete(this.url);
  }

  public isSeller(): boolean {
    let TOKEN = localStorage.getItem('token');
    let role = this._jwtHelperService.decodeToken(TOKEN ? TOKEN : undefined).role[0].authority;
    console.log("role " , role);
    return role == "ROLE_SELLER";
  }
}
