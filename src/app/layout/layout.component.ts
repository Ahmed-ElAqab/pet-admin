import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/userService/user.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public isAdmin: boolean;

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
    let userRole = this._userService.getUserRole();
    this.isAdmin = userRole == "ROLE_ADMIN";
  }

}
