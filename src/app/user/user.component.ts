import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { GroupsService } from '../groups.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any;
  newGroup: string;

  constructor(
    private userService: UsersService,
    private groupsService: GroupsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(result => {
      this.user = result;
      if (this.user.list_of_positions.length == 0) this.user.list_of_positions.push('No outstanding positions');
    });
  }

  deleteExposure() {
    this.userService.deleteExposure().subscribe(() => this.ngOnInit());
  }

  createGroup(){
    this.groupsService.createGroup(this.userService.getUser(), this.newGroup, this.userService.getPin())
      .subscribe(groupId => this.router.navigateByUrl(`/group/${groupId}`));
  }
}
