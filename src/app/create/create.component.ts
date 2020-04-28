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
    this.market.createMarket(this.newMarket).subscribe(() => this.router.navigateByUrl('/markets'))
  }

}
