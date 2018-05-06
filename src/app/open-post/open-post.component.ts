import { Component, OnInit, Input, OnDestroy, EventEmitter, Output, ViewChild, ElementRef, ApplicationRef } from '@angular/core';
import { Message } from '../model/message';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'open-post',
  templateUrl: './open-post.component.html',
  styleUrls: ['./open-post.component.css']
})
export class OpenPostComponent implements OnInit, OnDestroy {
  @Input('message') messageSubject: Subject<Message>;
  @Input('messages') messages: Message[];

  message: Message;

  subscription: Subscription;
  safeLink: SafeResourceUrl;
  opened: boolean;
  loading : boolean;
 
  constructor(public sanitizer: DomSanitizer, private appRef: ApplicationRef) {
  }

  ngOnInit(): void {
    this.messageSubject.subscribe(m => {
      if (m && this.message != m) {
        this.message = m;
        this.safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.message.post.linkUrl);
        //this.loading = false;
        this.opened = true;
        this.appRef.tick();
      }
    });
  }

  onDataLoad() {
    this.loading = false;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

 close() {
    this.loading = false;
    this.message = null;
    this.opened = false;
    this.safeLink = null;
 }

 goLeft($event) {
   this.pushNextAfter(false);
   this.blockPropagation($event);
 }

 goRight($event) {
  this.pushNextAfter(true);
  this.blockPropagation($event);
 }

 pushNextAfter(isRight: boolean) {
   let index = this.messages.indexOf(this.message);
   let fountMessage: Message = null;
   if (isRight && index < this.messages.length - 1) {
     fountMessage = this.messages[index + 1];
   } else if (!isRight && index > 0) {
     fountMessage = this.messages[index - 1];
   }
   console.log(fountMessage)
   if (fountMessage) {
     this.message = null;
     this.safeLink = null;
     this.messageSubject.next(fountMessage);
     //this.loading = true;
   }
 }

 blockPropagation($event) {
  $event.stopPropagation();
 }
}
