import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/User.model';
import { AuthenticationService } from '../service/authenticate/authentication.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from '../service/userService/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  formLogin: FormGroup;
  user: User = new User();
  public role: string;

  constructor(private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _routerService: Router,
    private jwtHelper: JwtHelperService,
    private userServie: UserService,
    private toasterService: ToastrService) {

  }


  ngOnInit(): void {
    console.log("Role ",);
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
        if (this.userServie.getUserRole() == "ROLE_SELLER") {
          console.log("ROLE_SELLER");
          this._routerService.navigate(['/seller']);
        }
         if (this.userServie.getUserRole() == "ROLE_SERVICE_PROVIDER") {
           console.log("ROLE_SERVICE_PROVIDER");
          this._routerService.navigate(['/seller']);
        } 
        if (this.userServie.getUserRole() == "ROLE_ADMIN") {
          console.log("ROLE_ADMIN");
          this._routerService.navigate(['/dashboard']);
        } 
        if (this.userServie.getUserRole() == "ROLE_USER"){
          console.log("ROLE_USER");
          this.toasterService.error("you cannot access this resource");
        }
      }
    }, (error: Error) => {

      console.log(error);
    })

  }

}
