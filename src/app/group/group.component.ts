import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../models/group';
import { GroupsService } from '../groups.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groupId: number;
  group: Group = {
    name: "",
    admins: [],
    users: []
  };
  admin: boolean;
  members: string[] = [];
  newMember: string;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = +params.id;
      this.groupsService.getGroup(this.groupId).subscribe(group => {
        this.group = group;
        this.admin = this.isAdmin(this.usersService.getUser());
      });
    });
  }

  isAdmin(user: string): boolean {
    return this.groupsService.isAdmin(user, this.group);
  }

  addUser(): void {
    this.groupsService.addUser(
      this.usersService.getUser(), this.usersService.getPin(),
      this.groupId, this.newMember
    ).subscribe(result => {
      if (result == false) this.error = true;
      else location.reload();
    });
  }

  leaveGroup(): void {
    this.groupsService.deleteUser(
      this.usersService.getUser(), this.usersService.getPin(), this.groupId
    ).subscribe(() => this.router.navigateByUrl(`/users/${this.usersService.getUser()}`))
  }
}
