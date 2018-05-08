import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';

@Component({
  animations: [
    trigger("fade", [
      transition("void <=> *", [
        style([{ backgroundColor: "darkgray", "box-shadow": "0px 0px 0px" }]),
        animate("1.5s ease-out", style([{ backgroundColor: "dimgray",  "box-shadow": "5px 5px 5px" }])
        )
      ])
    ])
  ],
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
