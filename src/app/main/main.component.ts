import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../model/message';
import { MessageService } from '../services/message.service';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { Observable } from 'rxjs/Observable';
import { Post } from '../model/post';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/merge';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { listAnimation } from '../shared/animations';
import { MessageLink } from '../model/message-link';

@Component({
  animations: [ listAnimation ],
  selector: "main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit, OnDestroy {
  static readonly START_COUNT = 20;
  static readonly COUNT_INCREASE = 10;
  subscription: Subscription;
  messages: Message[] = [];
  topN: number = MainComponent.START_COUNT;

  openMessage$ = new Subject<[Message, number]>();
  bsModalRef: BsModalRef;

  constructor(
    public userService: UserService,
    private messageService: MessageService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.subscribe();
  }

  subscribe() {
    this.subscription = this.messageService
      .list(this.topN)
      .subscribe(x => (this.messages = x));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onDeleteClick(m: Message) {
    this.bsModalRef = this.modalService.show(ModalDeleteComponent);
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result) {
        this.messageService.delete(m);
      }
    });
  }

  post(messageLink: MessageLink) {
    this.messageService.save(
      Message.create(
        this.userService.user.id,
        this.userService.user.displayName,
        messageLink
      )
    );
  }

  track(index, item) {
    return item.id;
  }

  onImageClick(m: Message) {
    this.openMessage$.next([m, this.messages.indexOf(m)]);
  }

  showMore() {
    this.topN += MainComponent.COUNT_INCREASE;
    this.ngOnDestroy();
    this.subscribe();
  }

  reset() {
    this.topN = MainComponent.START_COUNT;
    this.ngOnDestroy();
    this.subscribe();
  }
}
