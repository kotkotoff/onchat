import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { CommentService } from './comment.service';


@Injectable()
export class MessageService {
  private readonly _dbPath = '/messages/';

  constructor(private db: AngularFireDatabase, private userService: UserService, private commentService: CommentService) { }

  list(topN: number): Observable<Message[]> {
    return this.db.list(this._dbPath, ref => ref.orderByChild("date").limitToLast(topN)).
      snapshotChanges().map((m => m.map(x => new Message(x.key, x.payload.val())).reverse()));
  }

  save(message: Message) {
    this.db.list(this._dbPath).push(message);
  }

  delete(message: Message) {
    const user = this.userService.user;
    if (user && (user.isAdmin || user.id == message.userId)) {
      this.db.object(this._dbPath + message.id).remove();
      this.commentService.delete(message.id);
    }
  }
}
