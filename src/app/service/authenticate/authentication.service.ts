import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../model/User.model';
import {UserSignUp} from '../../model/UserSignUp';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  logged = new Subject<boolean>();

  constructor(private httpClient: HttpClient) {

    this.changeLoggedStatus(this.isLoggedIn());
  }

  public authenticate(credential: User): Observable<any> {
    return this.httpClient.post<User>(`${environment.apiUrl}` + 'auth/authenticate', credential);
  }

  public signUpAsSeller(userSignUp: UserSignUp): Observable<any> {
    return this.httpClient.post<UserSignUp>(`${environment.apiUrl}` + 'sellers/signUp', userSignUp);
  }
  public signUpAsServiceProvider(userSignUp: UserSignUp): Observable<any> {
    return this.httpClient.post<UserSignUp>(`${environment.apiUrl}` + 'serviceproviders/signUp', userSignUp);
  }

  public signUpAsAdmin(userSignUp: UserSignUp): Observable<any> {
    return this.httpClient.post<UserSignUp>(`${environment.apiUrl}` + 'admins/signUp', userSignUp);
  }

  public logOut() {
    localStorage.removeItem('token');
    this.changeLoggedStatus(false);
  }

  public login(token: string) {
    localStorage.setItem('token', token);
    console.log('token', token);
    this.changeLoggedStatus(true);
  }


  public isLoggedIn(): boolean {
    const TOKEN = localStorage.getItem("token");
    if (TOKEN == null) {
      return false;

    } else {
      return true;
    }
  }

  changeLoggedStatus(status: boolean): void {
    this.logged.next(status);
  }

  getLoggedStatus(): Observable<boolean> {
    return this.logged.asObservable();
  }

  public checkEmailExist(email:any):Observable<boolean>{
    return this.httpClient.post<boolean>(`${environment.apiUrl}` + 'auth/email',email);
  }

}
