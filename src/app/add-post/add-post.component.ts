import { MessageService } from './../services/message.service';
import { MessageLink } from './../model/message-link';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LinkParser } from './../model/link-parser';
import { Post } from '../model/post';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  @ViewChild("pop") popover;
  @Output('addPost') addPost = new EventEmitter<MessageLink>();
  isError: boolean;
  linkText: string = "";
  currentPost: Post = new Post();
  visible: boolean = true;
  private _safeLink: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private linkParser: LinkParser,
    private messageService: MessageService) {  }

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
    this.isError = false;
  }

  mediaError() {
    this.isError = true;
  }

  mediaLoaded() {
    const messageLink = new MessageLink(this.currentPost);
    this.messageService.save(messageLink).subscribe(result => {
      if (result) {
        this.clear();
        this.hideAndShow();
      } else {
        this.popover.show();
      }
    });
  }

  hideAndShow() {
    this.visible = false;
    setTimeout(() => {
      this.visible = true;
    }, 3000);
  }
}
