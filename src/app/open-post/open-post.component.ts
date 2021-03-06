import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Message } from '../model/message';
import { MessageService } from './../services/message.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'open-post',
  templateUrl: './open-post.component.html',
  styleUrls: ['./open-post.component.css']
})
export class OpenPostComponent implements OnInit, OnDestroy {

  @Input('message') messageSubject: Subject<[Message, number]>;
  messageIndex: number;
  subscription: Subscription;
  messages: Message[];
  takeTopN: number;
  prevMessageCount = 0;
  hasMoreMessages = true;

  message: Message;
  safeLink: SafeResourceUrl;
  opened: boolean;

  constructor(public sanitizer: DomSanitizer, private messageService: MessageService) {}

  ngOnInit(): void {
    this.subscription = this.messageSubject.subscribe(tuple => {
      const m = tuple[0];
      this.messageIndex = tuple[1];
      if (m && this.message !== m) {
        this.message = m;
        this.safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.message.messageLink.linkUrl);
        this.opened = true;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

 close() {
    this.message = this.safeLink = this.messages = null;
    this.opened = false;
    this.hasMoreMessages = true;
    this.messageIndex = this.takeTopN = this.prevMessageCount = 0;
 }

 goLeft($event) {
   this.pushNextAfter(false);
   this.blockPropagation($event);
 }

 goRight($event) {
  this.pushNextAfter(true);
  this.blockPropagation($event);
 }

 retrieve(isRight: boolean) {
    this.takeTopN = isRight ? this.messageIndex + 10 : this.messageIndex;
    this.prevMessageCount = this.messages ? this.messages.length : 0;
    this.messageService.list(this.takeTopN).take(1).subscribe(messages => {
      this.hasMoreMessages = messages.length - 1 > this.messageIndex;
      if (this.hasMoreMessages || !isRight) {
        this.messages = messages;
        this.getNextMessage(isRight);
      }
    });
 }

 pushNextAfter(isRight: boolean) {
   if (!this.messages || (isRight && this.hasMoreMessages && this.messageIndex >= this.messages.length - 1)) {
     this.retrieve(isRight);
   } else if (this.hasMoreMessages || !isRight) {
    this.getNextMessage(isRight);
   }
  }

  getNextMessage(isRight: boolean) {
    let foundMessage: Message;
    if (isRight && this.hasMoreMessages) {
      this.messageIndex++;
      foundMessage = this.messages[this.messageIndex];
    } else if (!isRight && this.messageIndex > 0) {
      this.messageIndex--;
      foundMessage = this.messages[this.messageIndex];
      this.hasMoreMessages = true;
    }

    if (foundMessage) {
      this.message = null;
      this.safeLink = null;
      this.messageSubject.next([foundMessage, this.messageIndex]);
    }
  }

 blockPropagation($event) {
  $event.stopPropagation();
 }
}
