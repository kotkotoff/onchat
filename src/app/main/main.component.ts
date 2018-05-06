import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, animate, query, stagger, transition } from '@angular/animations';
import { Message } from '../model/message';
import { UserService } from '../services/user.service';
import { ChatUser } from '../model/chat-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/merge';
import { MessageService } from '../services/message.service';
import { Subject } from 'rxjs/Subject';
import { Post } from '../model/post';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';

@Component({
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ 
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0) rotate(90deg)' }),
          stagger(100, [
            animate('0.25s', style({ opacity: 1, transform: 'scale(1) rotate(0deg)'}))
          ])
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1, transform: 'scale(1) rotate(0deg)' }),
          stagger(100, [
            animate('0.25s', style({ opacity: 0, transform: 'scale(0) rotate(90deg)'}))
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

  static readonly START_COUNT = 20;
  static readonly COUNT_INCREASE = 10;
  subscription: Subscription;
  messages: Message[] = [];
  user: ChatUser;
  topN: number = MainComponent.START_COUNT;
  
  openMessage$ = new Subject<Message>();
  

  ngOnInit(): void {
    this.subscribe();
  }

  subscribe() {
    this.subscription = this.messageService.list(this.topN).subscribe(x => this.messages = x);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor(userService: UserService, private messageService: MessageService, private modalService: NgbModal) {
    userService.getChatUser().take(1).subscribe(user => this.user = user);
  }

  onDeleteClick(m: Message) {
    const modalRef = this.modalService.open(ModalDeleteComponent);
      modalRef.result.then(() => {
        this.messageService.delete(m);
      }
    ).catch(x => {});
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

  showMore() {
    console.log('down')
    this.topN += MainComponent.COUNT_INCREASE;
    this.ngOnDestroy();
    this.subscribe();
  }

  
  reset(e) {
    console.log('up!')
    this.topN = MainComponent.START_COUNT;
    this.ngOnDestroy();
    this.subscribe();
  }
}
