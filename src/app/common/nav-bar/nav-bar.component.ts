import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../domain/services/LoginService';
import {UserRepository} from '../../domain/services/UserRepository';

@Component({
  selector: 'app-nav-bar',
  providers: [LoginService],
  template: `
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo hide-on-small-only">Programmable Metronome</a>
        <a href="#" class="brand-logo hide-on-med-and-up">Metronome</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <div *ngIf="user; then loggedUserBlock else unloggedUserBlock"></div>
            <ng-template #unloggedUserBlock>
              <a class="waves-effect waves-light btn" (click)="login()">Login</a>
            </ng-template>
            <ng-template #loggedUserBlock>
              <a class="waves-effect waves-light btn" (click)="logout()">Logout</a>
            </ng-template>
          </li>
        </ul>
      </div>
    </nav>
  `
})
export class NavBarComponent implements OnInit {
  user: any;

  constructor(public userRepository: UserRepository, private loginService: LoginService) {
  }

  ngOnInit() {
    this.userRepository.user.subscribe(x => {
      this.user = x;
    });
  }

  login() {
    this.loginService.login();
  }

  logout() {
    this.loginService.logout();
  }
}
