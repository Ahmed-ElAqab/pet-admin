import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SellerService} from "../../service/seller/seller.service";
import {ServiceProviderService} from "../../service/serviceProvider/service-provider.service";
import {UserService} from "../../service/userService/user.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderGuard implements CanActivate {
  constructor(private _serviceProvider: ServiceProviderService,
              private _routerService: Router,
              private _userService: UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._serviceProvider.isServiceProvider()) {
      return true;
    } else {
      let userRole = this._userService.getUserRole();
      if (userRole == "ROLE_SERVICE_PROVIDER") {
        this._routerService.navigateByUrl("/provider");
        return false;
      } else {
        this._routerService.navigateByUrl("/not-found");
        return false;
      }
    }
  }

}
