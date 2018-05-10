import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: '[top-navbar]',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent {
  @Output('brandClicked') brandClicked = new EventEmitter<void>();

  constructor(public userService: UserService,
    private authService: AuthService,
    private router: Router) {
  }

  onBrandClicked() {
    this.brandClicked.emit();
  }

  logout() {
    this.authService.logout();
    this.userService.logout();
    this.router.navigate(['login']);
  }
}
