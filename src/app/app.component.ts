import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Share!';
  xxx: string;

  constructor(authService: AuthService, router: Router, userService: UserService, http: HttpClient) {

    http.get<any>('https://vimeo.com/api/oembed.json?url=http%3A%2F%2Fvimeo.com%2F76979871').subscribe(
      x => {
      console.log(x) }
    );

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
