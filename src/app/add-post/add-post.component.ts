import { LinkParser } from './../model/link-parser';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Post } from '../model/post';
import { ChatUser } from '../model/chat-user';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  @Input('user') user: ChatUser;
  @Output("onPost") onPost = new EventEmitter<Post>();

  linkParser: LinkParser = new LinkParser();
  linkText: string;
  currentPost: Post;
  _safeLink: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.currentPost = new Post();
  }

  onTextChanged() {
    if (this.linkText.length < 500) {
      this.currentPost.rawData = this.linkText;
      this.linkParser.check(this.currentPost);
    }
  }

  get safeLink() {
    if (!this._safeLink) {
      this._safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentPost.linkUrl);
    }
    return this._safeLink;
  }

  post() {
    if (this.currentPost.isValid()) {
      this.linkParser.check(this.currentPost);
      this.onPost.emit(this.currentPost);
      this.clear();
    }
  }

  clear() {
    this.currentPost.clear();
    this.linkText = "";
    this._safeLink = null;
  }
}
