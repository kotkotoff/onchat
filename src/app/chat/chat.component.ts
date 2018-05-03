import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  animations: [
    trigger('slideRight', [
      transition('void <=> *', [
        style([{ transform: 'translateX(-100%)' }]),
        animate('1s ease-in', style({ transform: 'translateX(0)' }))
      ])
    ])
  ],
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
