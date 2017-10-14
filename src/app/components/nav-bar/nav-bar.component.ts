import {Component, OnInit} from '@angular/core';
import {IUserRepository} from '../../domain/services/IUserRepository';
import {ILoginService} from '../../domain/services/ILoginService';
import {ParseLoginService} from '../../domain/services/ParseLoginService';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  providers: [
    {provide: ILoginService, useClass: ParseLoginService},
  ]
})
export class NavBarComponent implements OnInit {
  user: any;

  constructor(public userRepository: IUserRepository, private loginService: ILoginService) {
  }

  ngOnInit() {
    this.user = this.userRepository.getCurrentUser();
    this.userRepository.user.subscribe(x => this.user = x);
  }

  login() {
    this.loginService.login();
  }

  logout() {
    this.loginService.logout();
  }
}
