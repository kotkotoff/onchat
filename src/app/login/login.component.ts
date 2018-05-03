import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthService } from '../services/auth.service';

@Component({
  animations: [
    trigger('fade', [
      transition('void <=> *', [
        style([{backgroundColor: 'darkgray', opacity: '0' }]),
        animate('2s ease-out', style([{backgroundColor: 'white', opacity: '1' }]))
      ])
    ])
  ],
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login();
  }
}
