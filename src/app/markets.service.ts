import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Market } from './market';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {
  url:string = 'http://0.0.0.0:80'

  constructor(private http: HttpClient) { }

  getMarket(id:number): Observable<Market> {
    return this.http.get<Market>(`${this.url}/markets/${id}`);
  }

  getAllMarkets(user:string, pin:string): Observable<Market[]> {
    return this.http.put<Market[]>(`${this.url}/markets`, {user, pin});
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

  getAllClosed(user: string, pin: string): Observable<Market[]> {
    return this.http.put<Market[]>(`${this.url}/closed`, { user, pin });
  }

  getPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/payments`);
  }

  settle(id: number, user: string, pin: string, settle: number, group: number): Observable<string> {
    return this.http.post<string>(`${this.url}/markets/${id}`, { user, pin, settle, group })
  }

}
