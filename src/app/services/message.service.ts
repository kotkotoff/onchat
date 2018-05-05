import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Message } from '../model/message';
import { DataSnapshot } from '@firebase/database';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';


@Injectable()
export class MessageService {

  constructor(private db: AngularFireDatabase, private userService: UserService) { }

  list(topN: number): Observable<Message[]> {
    return this.db.list('/messages', ref => ref.orderByChild("date").limitToLast(topN)).
      snapshotChanges().map((m  => m.map(x => new Message(x.key, x.payload.val())).reverse()));
  }

  save(m: Message) {
    this.db.list('/messages/').push(m);
  }

  delete(m: Message) {
    this.userService.getChatUser().switchMap(chatUser => 
      this.userService.getUser(chatUser.id).take(1))
      .subscribe(user => {
        if (user.isAdmin || user.id == m.userId) 
          this.db.object('/messages/' + m.id).remove();
      });
  }
}
