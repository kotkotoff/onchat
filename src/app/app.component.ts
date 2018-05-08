import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Share!';

  constructor(authService: AuthService, router: Router, userService: UserService, http: HttpClient) {

    authService.user$.subscribe(user => {
      if (!user) {
        router.navigate(['login']);
        return;
      }
      userService.createOrUpdate(user);
      router.navigate(['']);
    });
  }
}
