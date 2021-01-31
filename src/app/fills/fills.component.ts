import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarketsService } from '../markets.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-fills',
  templateUrl: './fills.component.html',
  styleUrls: ['./fills.component.css']
})
export class FillsComponent implements OnInit {
  payments: any[];

  constructor(
    private market: MarketsService, 
    private user: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.market.getPayments().subscribe(result => {
      for (let entry of result) entry.time = entry.time.replace(' ', 'T');
      this.payments = result;
    });
  }

  signOut() {
    this.user.logOut();
    this.router.navigateByUrl('/');
    location.reload();
  }

}
