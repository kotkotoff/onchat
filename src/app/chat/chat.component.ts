import { Component, OnInit } from '@angular/core';
import { trigger, style, state, animate, stagger, query, transition } from '@angular/animations';
import { Message } from '../model/message';
import { UserService } from '../services/user.service';
import { ChatUser } from '../model/chat-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import { MessageService } from '../services/message.service';
import { ImageService } from '../services/image.service';
import { Subject } from 'rxjs/Subject';

@Component({
  animations: [
    trigger('appear', [
      transition('void => *', [
        style([{ opacity: 0.1, transform: 'scale(0) rotate(20deg)' }]),
        animate('0.6s ease-in', style({ opacity: 1, transform: 'scale(1) rotate(0deg)' }))
      ])
    ]),
  ],
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  text: string;
  messages: Observable<Message[]> = Observable.empty();
  user: ChatUser;
  currentSrc: string = "";
  opened: boolean;
  imgSrc: string;
  loading: boolean;

  ngOnInit(): void {
    this.messages = this.messageService.list(18);
  }

  constructor(userService: UserService, private messageService: MessageService, private imageService: ImageService) {
    userService.getChatUser().take(1).subscribe(user => this.user = user);
  }

  newLine() {
      this.text += '\n';
  }

  post() {
    if (this.text) {
      this.text = this.text.trim();
      if (this.text.length > 500) { this.text = this.text.substring(0, 500); }
      const tuple = this.imageService.filter(this.text);
      if (tuple.imageUrl) {
        this.messageService.save(Message.create(tuple.text, this.user.id,
          this.user.displayName, tuple.imageUrl));
      }
    }
    this.text = "";
    this.currentSrc = "";
  }

  track(index, item) {
    return item.id;
  }

  onClick(m: Message) {

  }

  onTextChanged() {
    const tuple = this.imageService.filter(this.text);
    this.currentSrc = tuple.imageUrl;
  }

  openGallery(m: Message) {
     this.loading = true;
     this.opened = true;
     this.imgSrc = m.imageUrl;
     this.loading = false;
  }

  closeGallery() {
    this.opened = false;
    this.loading = false;
  }
}
