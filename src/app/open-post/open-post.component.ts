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
  @Input('message') messageSubject: Subject<Message>;
  @Input('messageIndex') messageIndex: number;

  subscription: Subscription;
  messages: Message[];
  takeTopN: number;
  prevMessageCount = 0;
  hasMoreMessages = false;

  message: Message;
  safeLink: SafeResourceUrl;
  opened: boolean;

  constructor(public sanitizer: DomSanitizer, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageSubject.subscribe(m => {
      if (m && this.message !== m) {
        this.message = m;
        this.safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.message.post.linkUrl);
        this.opened = true;
      }
    });
  }

  onDataLoad() {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

 close() {
    this.message = null;
    this.opened = this.hasMoreMessages = false;
    this.safeLink = null;
    this.messages = null;
    this.messageIndex = this.takeTopN = 0;
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
    this.takeTopN = this.messageIndex + 10;
    this.prevMessageCount = this.messages ? this.messages.length : 0;
    this.messageService.list(this.takeTopN).take(1).subscribe(messages => {
      this.hasMoreMessages = messages.length > this.prevMessageCount;

      if (this.hasMoreMessages) {
        this.messages = messages;
        this.getNextMessage(isRight);
      }
    });
 }

 pushNextAfter(isRight: boolean) {
   if (!this.messages || (isRight && this.hasMoreMessages && this.messageIndex >= this.messages.length - 1)) {
     this.retrieve(isRight);
   } else if (this.hasMoreMessages) {
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
    }
    if (foundMessage) {
      this.message = null;
      this.safeLink = null;
      this.messageSubject.next(foundMessage);
    }
  }

 blockPropagation($event) {
  $event.stopPropagation();
 }
}
