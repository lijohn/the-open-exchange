import { Component, OnInit } from '@angular/core';
import { MarketsService } from '../markets.service';

@Component({
  selector: 'app-fills',
  templateUrl: './fills.component.html',
  styleUrls: ['./fills.component.css']
})
export class FillsComponent implements OnInit {
  payments: any[];

  constructor(private market: MarketsService) { }

  ngOnInit() {
    this.market.getPayments().subscribe(result => {
      for (let entry of result) entry.time = entry.time.replace(' ', 'T');
      this.payments = result;
    });
  }

}
