import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Comments, Comment } from '../model/comments';

@Injectable()
export class CommentService {
  private readonly _dbPath = '/comments/';

  constructor(private db: AngularFireDatabase) { }

  list(id: string): Observable<Comments> {
    return this.db.list(this._dbPath + id + '/list/').snapshotChanges().map(c => {
       const list = c.map(comment => new Comment(comment.payload.val()));
       return new Comments(id, list);
      }
    );
  }

  save(id: string, comment: Comment) {
    this.db.list(this._dbPath + id + '/list/').push(comment);
  }

  delete (id: string) {
    this.db.object(this._dbPath + id).remove();
  }
}
