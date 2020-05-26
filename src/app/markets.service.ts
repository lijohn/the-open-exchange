import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Market } from './market';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {
  url:string = 'http://3.22.187.30'

  constructor(private http: HttpClient) { }

  getMarket(id:number): Observable<Market> {
    return this.http.get<Market>(`${this.url}/markets/${id}`);
  }

  getAllMarkets(): Observable<Market[]> {
    return this.http.get<Market[]>(`${this.url}/markets`);
  }

  createMarket(market:Market): Observable<void> {
    return this.http.post<void>(`${this.url}/markets`, market);
  }

  bid(order:Order): Observable<any> {
    return this.http.post<any>(`${this.url}/bids`, order);
  }

  ask(order:Order): Observable<any> {
    return this.http.post<any>(`${this.url}/asks`, order);
  }

  deleteExposure(id:number, user:any): Observable<string> {
    return this.http.put<string>(`${this.url}/markets/${id}`, user);
  }

  getAllClosed(): Observable<Market[]> {
    return this.http.get<Market[]>(`${this.url}/closed`);
  }

  castVote(id:number, user:any, vote:number): Observable<string> {
    return this.http.post<string>(`${this.url}/vote/${id}`, { user: user.user, pin: user.pin, vote });
  }

  getPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/payments`);
  }

}
