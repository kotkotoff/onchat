import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Message } from '../model/message';
import { DataSnapshot } from '@firebase/database';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class MessageService {
  
  constructor(private db: AngularFireDatabase) { }

  list(topN : number) : Observable<Message[]> {
    return this.db.list('/messages', ref => { return ref.orderByChild("date").limitToLast(topN) }).
      snapshotChanges().map((m  => m.map(x => new Message(x.key, x.payload.val())).reverse()));
  }

  save(m: Message) {
    this.db.list('/messages/').push(m);
  }
}
