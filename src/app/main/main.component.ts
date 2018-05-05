import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, animate, query, stagger, transition } from '@angular/animations';
import { Message } from '../model/message';
import { UserService } from '../services/user.service';
import { ChatUser } from '../model/chat-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import { MessageService } from '../services/message.service';
import { Subject } from 'rxjs/Subject';
import { Post } from '../model/post';
import { Subscription } from 'rxjs/Subscription';


@Component({
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ 
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0) rotate(20deg)' }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1, transform: 'scale(1) rotate(0deg)'}))
          ])
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1, transform: 'scale(1) rotate(0deg)' }),
          stagger(100, [
            animate('0.5s', style({ opacity: 0, transform: 'scale(0) rotate(20deg)'}))
          ])
        ], { optional: true }),
      ]),
    ])
  ],
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  messages: Message[] = [];
  user: ChatUser;
  
  openMessage$ = new Subject<Message>();

  ngOnInit(): void {
    this.subscription = this.messageService.list(18).subscribe(x => this.messages = x);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor(userService: UserService, private messageService: MessageService) {
    userService.getChatUser().take(1).subscribe(user => this.user = user);
  }


  post(post: Post) {
    this.messageService.save(Message.create(this.user.id, this.user.displayName, post));  
    
  }

  track(index, item) {
    return item.id;
  }

  onImageClick(m: Message) {
    this.openMessage$.next(m);
  }
}
