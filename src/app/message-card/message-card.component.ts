import { ImageService } from './../services/image.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Message } from '../model/message';
import { Post } from '../model/post';

@Component({
  selector: 'message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})
export class MessageCardComponent {

  @Output("onPost") onPost = new EventEmitter<Post>();
  text: string;
  imageSrc = "";

  constructor(private imageService: ImageService) { }

  newLine() {
    this.text += '\n';
  }

  onTextChanged() {
    const tuple = this.imageService.filter(this.text);
    this.imageSrc = tuple.imageUrl;
  }

  post() {
    if (this.text) {
      this.text = this.text.trim();
      if (this.text.length > 500) { this.text = this.text.substring(0, 500); }
      const post = this.imageService.filter(this.text);
      if (post.imageUrl) {
        this.onPost.emit(post);
        this.text = "";
        this.imageSrc = "";
      }
      else {

      }
    }
  }
}
