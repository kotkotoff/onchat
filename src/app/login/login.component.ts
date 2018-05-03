import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  animations: [
    trigger('fade', [
      transition('void <=> *', [
        style([{backgroundColor: 'darkgray', opacity: '0' }]),
        animate(2000, style([{backgroundColor: 'white', opacity: '1' }])
      ])
    ])
  ],
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor() { }
}
