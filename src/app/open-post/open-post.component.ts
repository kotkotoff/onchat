import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Message } from '../model/message';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { EventEmitter } from 'protractor';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'open-post',
  templateUrl: './open-post.component.html',
  styleUrls: ['./open-post.component.css']
})
export class OpenPostComponent implements OnInit, OnDestroy {
  @Input('message') messageSubject: Subject<Message>;
  message: Message;

  subscription: Subscription;
  safeLink: SafeResourceUrl;
  opened: boolean;
  loading : boolean;

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.messageSubject.subscribe(m => {
      if (m && this.message != m) {
        this.message = m;
        this.safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.message.post.linkUrl);
        this.loading = true;
        this.opened = true;
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
}
