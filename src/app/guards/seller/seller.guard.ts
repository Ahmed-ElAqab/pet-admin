import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {SellerService} from "../../service/seller/seller.service";
import {UserService} from "../../service/userService/user.service";

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {
  constructor(private _sellerService:SellerService,
              private _routerService:Router,
              private _userService:UserService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._sellerService.isSeller()) {
      return true;
    } else {
      let userRole = this._userService.getUserRole();
      if(userRole == "ROLE_SELLER"){
        this._routerService.navigateByUrl("/seller");
        return false;
      }else{
        this._routerService.navigateByUrl("/not-found");
        return false;
      }
    }
  }

}
