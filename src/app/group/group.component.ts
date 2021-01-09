import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../group';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groupId: number;
  group: Group = {
    admins: [],
    users: []
  };
  admin: string;
  members: string[] = [];
  newMember: string;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = +params.id;
      this.groupsService.getGroup(this.groupId).subscribe(group => {
        this.group = group;
      });
    });
  }

  isAdmin(user: string): boolean {
    for (let admin of this.group.admins) {
      if (admin === user) return true;
    }
    return false;
  }


}
