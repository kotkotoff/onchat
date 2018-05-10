import { MessageLink } from './../model/message-link';
import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { Message } from "../model/message";
import { Observable } from "rxjs/Observable";
import { UserService } from "./user.service";
import { CommentService } from "./comment.service";

@Injectable()
export class MessageService {
  private readonly _dbPath = "/messages/";

  constructor(
    private db: AngularFireDatabase,
    private userService: UserService,
    private commentService: CommentService
  ) {}

  list(topN: number): Observable<Message[]> {
    return this.db
      .list(this._dbPath, ref => ref.orderByChild("date").limitToLast(topN))
      .snapshotChanges()
      .map(m => m.map(x => new Message(x.key, x.payload.val())).reverse());
  }

  save(messageLink: MessageLink): Observable<boolean> {
    const imageUrl = messageLink.imageUrl;
    const query = imageUrl ?
      (ref) => ref.orderByChild("messageLink/imageUrl").equalTo(messageLink.imageUrl) :
      (ref) => ref.orderByChild("messageLink/linkUrl").equalTo(messageLink.linkUrl);

    return this.db.list(this._dbPath, query).snapshotChanges().take(1).switchMap((data) => {
        if (data.length === 0) {
          const userId = this.userService.user.id;
          const name = this.userService.user.displayName;
          const date = new Date().getTime();
          const message = new Message('', { userId, name, date, messageLink, commentCount: 0, likes: []} );
          this.db.list(this._dbPath).push(message);
          return Observable.of(true);
        } else {
          return Observable.of(false);
        }
      });
  }

  delete(message: Message) {
    const user = this.userService.user;
    if (user && (user.isAdmin || user.id === message.userId)) {
      this.db.object(this._dbPath + message.id).remove();
      this.commentService.delete(message.id);
    }
  }

  updateHasComments(m: Message) {
    if (!m.commentCount) {
      m.commentCount = 0;
    }
    this.db.object(this._dbPath + m.id).update({ commentCount: m.commentCount + 1 });
  }

  updateLikes(m: Message) {
    const userId = this.userService.user.id;
    if (!m.likes) {
      m.likes = [];
    }
    const index = m.likes.indexOf(userId);
    if (index > -1) {
      m.likes.splice(index, 1);
    } else {
      m.likes.push(userId);
    }
    this.db.object(this._dbPath + m.id).update({ likes: m.likes });
  }
}
