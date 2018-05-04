import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Message } from '../model/message';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'open-image',
  templateUrl: './open-image.component.html',
  styleUrls: ['./open-image.component.css']
})
export class OpenImageComponent implements OnInit, OnDestroy {
  @Input('message') message: Subject<Message>;

  subscription: Subscription;
  openedImageSrc: string;
  opened: boolean;
  loading: boolean;

  ngOnInit(): void {
    this.message.subscribe(m => {
      if (m) {
        this.openImage(m);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openImage(message: Message) {
    this.loading = true;
    this.opened = true;
    this.openedImageSrc = message.imageUrl;
    this.loading = false;
 }

 closeImage() {
   this.opened = false;
   this.loading = false;
 }
}
