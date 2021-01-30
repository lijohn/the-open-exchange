import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from './models/group';
import { BACKEND_URL } from './models/constants';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  url:string = BACKEND_URL;

  constructor(private http:HttpClient) { }

  createGroup(user:string, name:string, pin:string):Observable<number> {
    return this.http.post<number>(`${this.url}/groups`, { user, name, pin });
  }

  addUser(user:string, pin:string, group:number, newUser:string):Observable<any> {
    return this.http.put<any>(`${this.url}/groups`, { user, pin, group, newUser });
  }

  deleteUser(user:string, pin:string, group:number):Observable<any> {
    return this.http.put<any>(`${this.url}/groups/${group}`, { user, pin });
  }

  getGroup(group:number):Observable<Group> {
    return this.http.get<Group>(`${this.url}/groups/${group}`);
  }

  isAdmin(user: string, group: Group) {
    for (let admin of group.admins) {
      if (admin === user) return true;
    }
    return false;
  }
}
