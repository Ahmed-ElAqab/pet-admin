import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../model/User.model';
import {AuthenticationService} from '../service/authenticate/authentication.service';
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from '../service/userService/user.service';
import {ToastrService} from 'ngx-toastr';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  formLogin: FormGroup;
  user: User = new User();
  public role: string;
  token: string;
  isBadCredential: boolean;
  badCredentialMessage: string = "";

  constructor(private _formBuilder: FormBuilder,
              private _authenticationService: AuthenticationService,
              private _routerService: Router,
              private jwtHelper: JwtHelperService,
              private userServie: UserService,
              private toasterService: ToastrService) {

  }


  ngOnInit(): void {
    this.formLogin = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      password: ['', [Validators.required]]
    });

  }


  public login() {
    Object.assign(this.user, this.formLogin.value);
    this._authenticationService.authenticate(this.user).subscribe((response: any) => {
      if (response.jwtToken) {
     this._authenticationService.login(response.jwtToken);
        const USER_ROLE = this.userServie.getUserRole();
        this._authenticationService.login(response.jwtToken);
        if (USER_ROLE === "ROLE_SELLER") {
          this._routerService.navigate(['/seller']);
        }
        if (USER_ROLE === "ROLE_SERVICE_PROVIDER") {
          this._routerService.navigate(['/provider']);
        }
        if (USER_ROLE === "ROLE_ADMIN") {
          this._routerService.navigate(['/dashboard']);
        }
        if (USER_ROLE == "ROLE_USER" || USER_ROLE == "ROLE_CUSTOMER" ) {
          this.toasterService.error("you cannot access this resource");
        }
      }
    }, (error: HttpErrorResponse) => {
      if (error.status == 403) {
        this.badCredentialMessage = "This Email dos not Exist you can sign up";
        // this.toasterService.error(error.error.message);
        this.isBadCredential = true;
      }
      if (error.status == 404)
        this.badCredentialMessage = error.error.message;
      // this.toasterService.error(error.error.message);
      this.isBadCredential = true;
    })

  }

}
