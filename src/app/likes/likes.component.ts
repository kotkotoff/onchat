import { MessageService } from './../services/message.service';
import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Message } from '../model/message';

@Component({
  selector: 'likes',
  templateUrl: './likes.component.html'
})
export class LikesComponent {

  @Input('message') message: Message;
  userId: string;

  constructor(userService: UserService, private messageService: MessageService) {
    this.userId = userService.user? userService.user.id : null; 
  }

  like($event) {
    this.messageService.updateLikes(this.message);
    $event.stopPropagation();
  }
}
