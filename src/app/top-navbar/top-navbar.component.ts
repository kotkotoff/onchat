import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  animations: [
    trigger('slideDown', [
      transition('void <=> *', [
        style([{ transform: 'translateY(-100%)' }]),
        animate('1s ease-in', style({ transform: 'translateY(0)' }))
      ])
    ])
  ],
  selector: 'top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent {
  @Output('onScrollUp') onScrollUp = new EventEmitter<void>();

  constructor(public userService: UserService,
    private authService: AuthService,
    private router: Router) {
  }

  scrollUp() {
    this.onScrollUp.emit();
  }

  logout() {
    this.authService.logout();
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
