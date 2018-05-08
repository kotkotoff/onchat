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
  @Output("addPost") addPost = new EventEmitter<Post>();

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
      this.addPost.emit(this.currentPost);
      this.clear();
    }
  }

  clear() {
    this.currentPost.clear();
    this.linkText = "";
    this._safeLink = null;
  }
}
