import {Component, OnInit} from '@angular/core';
import {IUserService} from '../../domain/services/IUserService';
import {FirebaseUserService} from '../../domain/services/FirebaseUserService';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  providers: [
    {provide: IUserService, useClass: FirebaseUserService}
  ]
})
export class NavBarComponent implements OnInit {
  user: Observable<any>;

  constructor(public userService: IUserService) {
  }

  ngOnInit() {
    this.user = this.userService.user;
  }

  login() {
    this.userService.login();
  }

  logout() {
    this.userService.logout();
  }
}
