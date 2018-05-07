import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Message } from '../model/message';
import { MessageService } from '../services/message.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../services/user.service';


@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input('message') message: Message;
  @Output('postClicked') postClicked = new EventEmitter<Message>();
  @Output("postDeleted") postDeleted = new EventEmitter<Message>();

  _safeLink: SafeResourceUrl;

  constructor(public userService: UserService, private messageService: MessageService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  onImageClick() {
    this.postClicked.emit(this.message);
  }

  deleteClicked() {
    this.postDeleted.emit(this.message);
  }

  get safeLink() {
    if (!this._safeLink) {
      this._safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.message.post.linkUrl);
    }
    return this._safeLink;
  }
}
