import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.market.getPayments().subscribe(result => {
      this.route.params.subscribe(params => {
        let payments = [];
        for (let entry of result) {
          entry.time = entry.time.replace(' ', 'T');
          if (entry.security_id == +params.id) payments.push(entry);
        }
        this.payments = payments;
      });
    });
  }

}
