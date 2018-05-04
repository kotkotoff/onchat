import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
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
import { Post } from '../model/post';


@Component({
  animations: [
    trigger('appear', [
      transition('void => *', [
        style([{ opacity: 0.1, transform: 'scale(0) rotate(20deg)' }]),
        animate('0.6s ease-in', style({ opacity: 1, transform: 'scale(1) rotate(0deg)' }))
      ]),
      transition('* => void', [
        style([{ opacity: 1, transform: 'scale(1)' }]),
        animate('0.6s ease-in', style({ opacity: 0, transform: 'scale(0)' }))
      ]),
    ]),
  ],
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Observable<Message[]> = Observable.empty();
  user: ChatUser;
  
  openMessage$ = new Subject<Message>();

  ngOnInit(): void {
    this.messages = this.messageService.list(18);
  }

  constructor(userService: UserService, private messageService: MessageService, private imageService: ImageService) {
    userService.getChatUser().take(1).subscribe(user => this.user = user);
  }


  post(post: Post) {
    this.messageService.save(Message.create(post.text, this.user.id,
      this.user.displayName, post.imageUrl));
  }

  track(index, item) {
    return item.id;
  }

  onImageClick(m: Message) {
    this.openMessage$.next(m);
  }
}
