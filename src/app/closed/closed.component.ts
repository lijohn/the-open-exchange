import { Component, OnInit } from '@angular/core';
import { Market } from '../models/market';
import { MarketsService } from '../markets.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.css']
})
export class ClosedComponent implements OnInit {
  markets: Market[];
  constructor(private market: MarketsService, private user: UsersService) { }

  ngOnInit() {
    this.market.getAllClosed(this.user.getUser(), this.user.getPin())
      .subscribe(result => {
        for (let market of result) {
          market.create_time = market.create_time.replace(' ', 'T');
          // market.end_time = market.end_time.replace(' ', 'T');
        }
        this.markets = result;
      });
  }

}
