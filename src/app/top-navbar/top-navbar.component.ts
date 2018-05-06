import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatUser } from '../model/chat-user';
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
export class TopNavbarComponent implements OnInit {
  @Output('onScrollUp') onScrollUp = new EventEmitter<void>();
  user$: Observable<ChatUser>;

  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router) {
   }

   ngOnInit(): void {
    this.user$ = this.userService.getChatUser();
  }

   scrollUp() {
     this.onScrollUp.emit();
   }

   logout() {
     this.authService.logout();
     this.userService.removeCachedUser();
     this.router.navigate(['login']);
   }
}
