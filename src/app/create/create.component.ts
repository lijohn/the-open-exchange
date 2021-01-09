import { Component, OnInit } from '@angular/core';
import { MarketsService } from '../markets.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { Group } from '../group';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newMarket:any = {
    name: '',
    description: '',
    group: null,
    end: null
  };

  groups: Group;
  error: boolean = false;

  constructor(private market:MarketsService, private router:Router, private user: UsersService) { }

  ngOnInit() {
    this.user.getUserInfo().subscribe(result => this.groups = result.list_of_groups)
  }

  createMarket() {
    if (this.newMarket.name == '' || this.newMarket.description == '' || this.newMarket.group == "Choose a group") {
      this.error = true;
      return;
    }
    let current = new Date();
    let defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 100000);
    let dateISO = defaultDate.toISOString();
    dateISO = dateISO.substring(0, dateISO.length - 8);
    if (this.newMarket.end == null) this.newMarket.end = dateISO;
    else {
      let end = new Date(this.newMarket.end);
      if (end <= current) this.newMarket.end = dateISO;
    }
    this.market.createMarket(this.newMarket).subscribe(() => this.router.navigateByUrl('/markets'))
  }

}
