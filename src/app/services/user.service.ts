import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { ChatUser } from './../model/chat-user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private readonly _dbPath: string = '/chat-users/';

  user: ChatUser;

  constructor(private db: AngularFireDatabase, private authService: AuthService) { }

  createOrUpdate(user: firebase.User) {
    let newUser: ChatUser;
    this.getUser(user.uid).take(1).subscribe(chatUser => {
      if (chatUser && chatUser.id === user.uid) {
        chatUser.updateFrom(user);
        newUser = chatUser;
      } else {
        newUser = ChatUser.create(user);
      }
      this.db.object(this._dbPath + user.uid).update(newUser);
      this.user = newUser;
    });
  }

  logout() {
    this.user = null;
  }

  private getUser(userId: string): Observable<ChatUser|null> {
     return this.db.object(this._dbPath + userId)
      .snapshotChanges()
      .map(s => {
        return s.key ? new ChatUser(s.key, s.payload.val()) : null;
       });
  }
}
