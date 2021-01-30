import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { GroupsService } from '../groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = new User;
  newGroup: string;

  constructor(
    private userService: UsersService,
    private groupsService: GroupsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUserInfo().subscribe(result => {
        this.user = result;
        this.user.name = params.user;
      });
    })
  }

  deleteExposure() {
    this.userService.deleteExposure().subscribe(() => this.ngOnInit());
  }

  createGroup(){
    this.groupsService.createGroup(this.userService.getUser(), this.newGroup, this.userService.getPin())
      .subscribe(groupId => this.router.navigateByUrl(`/group/${groupId}`));
  }
}
