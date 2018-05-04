import { Component, OnInit } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { Message } from '../model/message';
import { UserService } from '../services/user.service';
import { ChatUser } from '../model/chat-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/empty';
import { MessageService } from '../services/message.service';
import { ImageService } from '../services/image.service';
import { ImageMessage } from '../model/image-message';

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
        style([{ opacity: 0.1, transform: 'scale(0)' }]),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
  ],
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  text: string;
  messages: Observable<Message[]> = Observable.empty();
  imageMessages: Observable<Message[]> = Observable.empty();
  user: ChatUser;


  ngOnInit(): void {
    this.messages = this.messageService.list(15);
    this.imageMessages = this.messages.map(messages => {
      return messages.reduce((r, m) => {
        let im = this.imageService.filter( m);
        if (im) r.push(im);
        return r;
      }, []);
    });
  }

  constructor(userService: UserService, private messageService: MessageService, private imageService: ImageService) {
    userService.getChatUser().take(1).subscribe(user => this.user = user);
  }

  newLine() {
    console.log('dsda')
    this.text += '\n';
  }

  send() {
    if (this.text) {
      this.text = this.text.trim();
      if (this.text.length == 0) return;
      if (this.text.length > 500) this.text = this.text.substring(0, 500);
      this.messageService.save(Message.create(this.text, this.user.id, this.user.displayName))
    }
    this.text = "";
  }

  track(index, item) {
    return item.id;
  }
}
