import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserSignUp } from '../model/UserSignUp';
import { AuthenticationService } from '../service/authenticate/authentication.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css']
})
export class NewAdminComponent implements OnInit {

  public userSignUp: UserSignUp = new UserSignUp();
  public formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _routerService: Router,
    private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    this.buildReactiveForm();
  }


  public signUp(): void {
    this.aggregateUserData();
    console.log(this.userSignUp)
    this._authenticationService.signUpAsAdmin(this.userSignUp)
      .subscribe((response) => {
        this.toasterService.success(this.userSignUp.firstName + this.userSignUp.lastName + "has become Admin");
      }, (error: HttpErrorResponse) => {
        this.toasterService.error(error.message)
      });
  }

  private buildReactiveForm(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      gender: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]],
      street: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      role: ['', [Validators.required]],
      birthDate: ['', [Validators.required]]
    });
  }

  private aggregateUserData(): void {
    this.userSignUp.email = this.formLogin.value.email;
    this.userSignUp.firstName = this.formLogin.value.firstName;
    this.userSignUp.lastName = this.formLogin.value.lastName;
    this.userSignUp.userName = this.formLogin.value.userName;
    this.userSignUp.password = this.formLogin.value.password;
    this.userSignUp.phoneNumber = this.formLogin.value.phoneNumber;
    this.userSignUp.gender = this.formLogin.value.gender;
    this.userSignUp.role = "ROLE_ADMIN";
    this.userSignUp.birthDate = this.formLogin.value.birthDate;
    this.userSignUp.address.country = this.formLogin.value.country;
    this.userSignUp.address.city = this.formLogin.value.city;
    this.userSignUp.address.street = this.formLogin.value.street;
  }
}
