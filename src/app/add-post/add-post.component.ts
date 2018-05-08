import { MessageLink } from './../model/message-link';
import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LinkParser } from './../model/link-parser';
import { Post } from '../model/post';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  @Output('addPost') addPost = new EventEmitter<MessageLink>();

  linkText: string= "";;
  currentPost: Post= new Post();
  private _safeLink: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private linkParser: LinkParser) {  }

  onTextChanged() {
    if (this.linkText && this.linkText.length < 500) {
      this.currentPost.rawData = this.linkText;
      this.linkParser.check(this.currentPost);
    }
  }

  get safeLink() {
    if (!this._safeLink && this.currentPost.linkUrl) {
      this._safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentPost.linkUrl);
    }
    return this._safeLink;
  }

  clear() {
    this.currentPost.clear();
    this.linkText = "";
    this._safeLink = null;
  }

  mediaLoaded() {
    const ml = new MessageLink(this.currentPost);
    this.addPost.emit(ml);
    this.clear();
  }
}
