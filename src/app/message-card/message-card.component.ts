import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../model/message';

@Component({
  selector: 'message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})
export class MessageCardComponent {
  @Input("message") message: Message;

  constructor() { }

}
