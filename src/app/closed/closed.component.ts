import { Component, OnInit } from '@angular/core';
import { Market } from '../market';
import { MarketsService } from '../markets.service';

@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.css']
})
export class ClosedComponent implements OnInit {
  markets: Market[];
  constructor(private market: MarketsService) { }

  ngOnInit() {
    this.market.getAllClosed().subscribe(result => {
      for (let market of result) {
        market.create_time = market.create_time.replace(' ', 'T');
        market.end_time = market.end_time.replace(' ', 'T');
      }
      this.markets = result;
    });
  }

}
