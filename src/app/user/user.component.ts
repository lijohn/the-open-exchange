import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(result => {
      this.userService.setGroups(result.list_of_groups);
      this.user = result;
      if (this.user.list_of_positions.length == 0) this.user.list_of_positions.push('No outstanding positions');
    });
  }

  deleteExposure() {
    this.userService.deleteExposure().subscribe(() => this.ngOnInit());
  }

}
