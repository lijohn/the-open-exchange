import { Component, OnInit } from '@angular/core';
import { MarketsService } from '../markets.service';
import { Market } from '../market';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newMarket:any = {
    name: '',
    description: '',
    end: null
  };

  constructor(private market:MarketsService, private router:Router) { }

  ngOnInit() {
  }

  createMarket() {
    let current = new Date();
    let defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
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
