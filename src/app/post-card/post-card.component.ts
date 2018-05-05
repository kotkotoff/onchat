import { ChatUser } from './../model/chat-user';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Message } from '../model/message';
import { MessageService } from '../services/message.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input('message') message: Message;
  @Input('user') user: ChatUser;
  @Output('onClick') onClick = new EventEmitter<Message>();

  _safeLink: SafeResourceUrl;

  constructor(private messageService: MessageService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  onImageClick() {
    this.onClick.emit(this.message);
  }

  delete() {
    if(confirm("Delete message?")) {
      this.messageService.delete(this.message);
    }
    return false;
  }

  get safeLink() {
    if (!this._safeLink) this._safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.message.post.linkUrl); 
    return this._safeLink;
  }
}
