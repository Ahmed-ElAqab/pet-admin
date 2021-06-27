import {Component, OnInit} from '@angular/core';
import {Admin} from '../model/Admin.model';
import {AdminService} from '../service/admin/admin.service';

@Component({
  selector: 'app-admins-board',
  templateUrl: './admins-board.component.html',
  styleUrls: ['./admins-board.component.css']
})
export class AdminsBoardComponent implements OnInit {

  admins: Admin[];
  pageLimit = 12;
  page = 1;
  count: number;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.getAdmins();
  }

  pageChanged(newPage: number): void {
    this.page = newPage;
    this.getAdmins();
  }

  private getAdmins(): void {
    this.adminService.getAdmins(this.page - 1, this.pageLimit).subscribe(response => {
      this.admins = response.admins;
      this.count = response.count;
    });
  }
}
