import { ChatUser } from './../model/chat-user';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Message } from '../model/message';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input('message') message: Message;
  @Input('user') user: ChatUser;
  @Output('onClick') onClick = new EventEmitter<Message>();

  constructor(private messageService: MessageService) { }

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
}
