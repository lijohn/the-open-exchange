import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketsService } from '../markets.service';
import { Market } from '../models/market';
import { Order } from '../models/order';
import { Comment } from '../models/comment';
import { UsersService } from '../users.service';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  currentMarket: Market = new Market;
  order: Order = new Order;
  comments: Comment[] = [];
  comment: string;
  bidask: boolean = true;
  message: string;
  settle: number;
  admin: boolean;
  marketPrice: number;
  marketVolume: number;

  constructor(
    private route: ActivatedRoute,
    private market: MarketsService,
    private userService: UsersService,
    private groupsService: GroupsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.order.security = +params.id;
      this.getMarketData();
    })
    this.order.user = this.userService.getUser();
    this.order.pin = this.userService.getPin();
  }

  toggleBidAsk(value: boolean): void {
    this.bidask = value;
    this.getMarketData();
  }

  getMarketData(): void {
    this.market.getMarket(this.order.security).subscribe(result => {
      this.currentMarket = result;
      this.currentMarket.create_time = this.currentMarket.create_time.replace(' ', 'T');
      this.order.group = result.group_id;
      this.getComments();
      this.groupsService.getGroup(result.group_id).subscribe(group => {
        this.admin = this.groupsService.isAdmin(this.userService.getUser(), group);
      })

      // set market values as initial placeholder
      this.marketPrice = this.bidask ? result.best_ask : result.best_bid;
      this.marketVolume = this.bidask ? result.best_ask_volume : result.best_bid_volume;
      this.order.price = this.marketPrice;
      this.order.volume = this.marketVolume;
    });
  }

  getComments(): void {
    this.market.getComments(this.order.security, this.order.user, this.order.pin, this.order.group)
      .subscribe(result => {
        this.comments = result.reverse();
        for (let comment of this.comments) comment.time = comment.time.replace(' ', 'T');
      });
  }

  postComment(): void {
    this.market.postComment(this.order.security, this.comment, this.order.user, this.order.pin, this.order.group)
      .subscribe(commentId => {
        this.getComments();
        this.comment = '';
      });
  }

  addOrder(): void {
    if (!this.validateInputs()) {
      this.message = 'Invalid inputs';
      this.clearInputs();
      return;
    }
    if (this.bidask) this.market.bid(this.order).subscribe(result => {
      if ((typeof result) == 'string') this.message = result;
      else {
        this.message = '';
        this.clearInputs();
      }
    })
    else if (this.bidask === false) {
      this.market.ask(this.order).subscribe(result => {
        if ((typeof result) == 'string') this.message = result;
        else {
          this.message = '';
          this.clearInputs();
        }
      })
    }
  }

  validateInputs(): boolean {
    if (this.isNumeric(this.order.price) && this.isNumeric(this.order.volume)
        && this.order.volume > 0 && this.order.price > 0) {
      if (this.currentMarket.tags.includes('binary') && this.order.price > 1) {
          return false;
      }
      return true;
    }
    return false;
  }

  clearInputs(): void {
    this.order.price = null;
    this.order.volume = null;
    this.getMarketData();
  }

  deleteExposure(): void {
    this.market.deleteExposure(this.order.security, { user: this.order.user, pin: this.order.pin })
      .subscribe(result => {
        this.message = result;
        this.getMarketData();
      });
  }

  settleMarket(): void {
    if (!this.isNumeric(this.settle) || this.settle < 0
        || (this.currentMarket.tags.includes('binary') && this.settle > 1)) {
      this.message = 'Invalid input';
      return;
    }
    this.market.settle(this.order.security, this.order.user, this.order.pin, this.settle, this.currentMarket.group_id)
      .subscribe(result => {
        if (result != null) this.message = result;
        else this.router.navigateByUrl(`/closed`);
      })
  }

  isNumeric(input: any): boolean {
    let inputString = String(input);
    return !(new RegExp('[a-zA-Z+-]')).test(inputString)
      && inputString.trim().length != 0 && !isNaN(Number(inputString));
  }

}
