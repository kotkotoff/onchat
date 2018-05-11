import { OnInit } from '@angular/core';
import { UserService } from './../services/user.service';
import { MessageService } from './../services/message.service';
import { Component, Input } from '@angular/core';
import { Message } from '../model/message';

@Component({
  selector: '[likes]',
  templateUrl: './likes.component.html'
})
export class LikesComponent implements OnInit {

  userId: string;
  @Input('message') message: Message;

  constructor(private messageService: MessageService, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.userService.user.id;
  }

  like($event) {
    this.messageService.updateLikes(this.message);
    $event.stopPropagation();
  }
}
