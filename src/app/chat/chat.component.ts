import { Component, OnInit } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { Message } from '../model/message';
import { UserService } from '../services/user.service';
import { ChatUser } from '../model/chat-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/empty';
import { MessageService } from '../services/message.service';

@Component({
  animations: [
    trigger('slideRight', [
      transition('void <=> *', [
        style([{ transform: 'translateX(-100%)' }]),
        animate('1s ease-in', style({ transform: 'translateX(0)' }))
      ])
    ]),
    trigger('appear', [
      transition('void => *', [
        style([{ opacity: 0.1, transform: 'translateX(-100%)' }]),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ],
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  text: string;
  messages: Observable<Message[]> = Observable.empty();
  user: ChatUser;

  
  ngOnInit(): void {
    this.messages = this.messageService.list(15);
  }

  constructor(userService: UserService, private messageService: MessageService) { 
    userService.getChatUser().take(1).subscribe(user => this.user = user);
  }

  newLine() {
    console.log('dsda')
    this.text += '\n';
  }

  send() {
    //this.messages.unshift();
    this.messageService.save(Message.create(this.text, this.user.displayName))
    this.text = "";
  }

  track(index, item) {
    return item.id;
}
}
