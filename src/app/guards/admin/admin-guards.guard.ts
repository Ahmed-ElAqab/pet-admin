import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AdminService} from "../../service/admin/admin.service";
import {UserService} from "../../service/userService/user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardsGuard implements CanActivate {
  constructor(private _adminService: AdminService,
              private _routerService: Router,
              private _userService: UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._adminService.isAdmin()) {
      return true;
    } else {
      let userRole = this._userService.getUserRole();
      if (userRole == "ROLE_ADMIN") {
        this._routerService.navigateByUrl("/dashboard");
        return false;
      } else if (userRole == "ROLE_SELLER") {
        this._routerService.navigateByUrl("/seller");
        return false;
      } else if (userRole == "ROLE_SERVICE_PROVIDER") {
        this._routerService.navigateByUrl("/provider");
        return false;
      } else {
        this._routerService.navigateByUrl("/not-found");
        return false;

      }
    }
  }

}
