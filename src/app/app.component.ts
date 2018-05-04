import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Onchat';

  constructor(authService: AuthService, router: Router, userService: UserService) {

    authService.user$.subscribe(user => {
      if (!user) { return; }
      userService.getUser(user.uid).take(1).subscribe(chatUser => {
        if (chatUser) {
          userService.update(user, chatUser);
        }
        else {
          userService.save(user);
        }
      });
      
      router.navigate(["/chat"]);
    });
  }
}
