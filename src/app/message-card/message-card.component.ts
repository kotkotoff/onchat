import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../model/message';
import { ImageMessage } from '../model/image-message';

@Component({
  selector: 'message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})
export class MessageCardComponent {
  @Input('message') message: ImageMessage;

  constructor() { }

}
