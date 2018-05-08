import { Observable } from 'rxjs/Observable';
import { CommentService } from "./../services/comment.service";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Message } from "../model/message";
import { MessageService } from "../services/message.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { UserService } from "../services/user.service";
import { Comments, Comment } from '../model/comments';

@Component({
  selector: "post-card",
  templateUrl: "./post-card.component.html",
  styleUrls: ["./post-card.component.css"]
})
export class PostCardComponent implements OnInit {
  @Input("message") message: Message;
  @Output("postClicked") postClicked = new EventEmitter<Message>();
  @Output("postDeleted") postDeleted = new EventEmitter<Message>();

  _safeLink: SafeResourceUrl;
  comments: Observable<Comments>;
  newCommentText: string;

  constructor(
    public userService: UserService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private commentService: CommentService
  ) {}

  ngOnInit() {}

  onImageClick() {
    this.postClicked.emit(this.message); /// WHY!
  }

  deleteClicked() {
    this.postDeleted.emit(this.message); /// WHY!
  }



  get safeLink() {
    if (!this._safeLink) {
      this._safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.message.post.linkUrl
      );
    }
    return this._safeLink;
  }

  onCommentTabSelect() {
    if (!this.comments) {
      this.comments = this.commentService.list(this.message.id);
    }
  }

  addComment() {
    if (this.newCommentText && this.newCommentText.length < 500) {
      const comment = new Comment({date: new Date().getTime(), userName: this.userService.user.displayName, comment: this.newCommentText});
      this.commentService.save(this.message.id, comment);
      this.messageService.updateHasComments(this.message);
      this.newCommentText = "";
    }
  }
}
