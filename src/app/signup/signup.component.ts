import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:string;
  pin:string;
  error:string;

  constructor(private userService:UsersService, private router:Router) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    if (this.user) this.router.navigateByUrl(`/users/${this.user}`);
  }

  addUser() {
    this.userService.createUser(this.user, this.pin).subscribe(result => {
      if (result == "Username taken") this.error = result;
      else {
        this.userService.setCredentials(this.user, this.pin);
        location.reload();
      }
    });
  }

  login() {
    this.userService.verifyUser(this.user, this.pin).subscribe(result => {
      if (!result) this.error = "Invalid Credentials";
      else {
        this.userService.setCredentials(this.user, this.pin);
        location.reload();
      }
    })
  }

}
