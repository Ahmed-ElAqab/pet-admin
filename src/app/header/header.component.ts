import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../service/authenticate/authentication.service';
import { UserService } from '../service/userService/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _authenticationService: AuthenticationService,
    private _routerService: Router,
    private jwtHelper: JwtHelperService,
    private userServie: UserService) {

    }

  ngOnInit(): void {

  }


  logout(){

    this._authenticationService.logOut();
    this._routerService.navigate(["/login"]);

  }

}
