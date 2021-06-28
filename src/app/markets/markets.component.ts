import { Component, OnInit } from '@angular/core';
import { MarketsService } from '../markets.service';
import { Market } from '../models/market';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit {
  markets:Market[];
  marketsFull: Market[];
  query: string;

  constructor(private market: MarketsService, private user: UsersService) { }

  ngOnInit() {
    this.market.getAllMarkets(this.user.getUser(), this.user.getPin())
      .subscribe(result => {
        for (let market of result) {
          market.create_time = market.create_time.replace(' ', 'T');
        }
        this.markets = result;
        this.marketsFull = this.markets;
      });
  }

  search() {
    this.markets = this.marketsFull.filter(market => {
      return market.market_name.includes(this.query)
        || market.group_name.includes(this.query)
        || String(market.tags).includes(this.query);
    })
  }

}
