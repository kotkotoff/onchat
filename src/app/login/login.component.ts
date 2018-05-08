import { fadeAnimation } from './../shared/animations';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';

@Component({
  animations: [fadeAnimation],
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login() {
    this.authService.login();
  }
}
