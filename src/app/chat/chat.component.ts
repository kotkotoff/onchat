import { Component, OnInit } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { Message } from '../model/message';
import { UserService } from '../services/user.service';
import { ChatUser } from '../model/chat-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import { MessageService } from '../services/message.service';
import { ImageService } from '../services/image.service';
import { Subject } from 'rxjs/Subject';

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
  selectedMessage: Observable<Message> = Observable.empty();
  user: ChatUser;
  clickImageEmitter: Subject<Message> = new Subject<Message>();


  ngOnInit(): void {
    this.messages = this.messageService.list(15);
    this.selectedMessage = this.messages.map(m => m.reverse()).mergeMap(m => m).filter(m => {
        return m.imageUrl ? true : false; }).merge(this.clickImageEmitter.asObservable());
  }

  constructor(userService: UserService, private messageService: MessageService, private imageService: ImageService) {
    userService.getChatUser().take(1).subscribe(user => this.user = user);
  }

  newLine() {
      this.text += '\n';
  }

  send() {
    if (this.text) {
      this.text = this.text.trim();
      if (this.text.length === 0) { return; }
      if (this.text.length > 500) { this.text = this.text.substring(0, 500); }

      const tuple = this.imageService.filter(this.text);
      this.messageService.save(Message.create(tuple[0], this.user.id,
        this.user.displayName , tuple[1]));
    }
    this.text = "";
  }

  track(index, item) {
    return item.id;
  }

  onClick(m: Message) {
    this.clickImageEmitter.next(m);
  }
}
