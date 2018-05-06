import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { ChatUser } from './../model/chat-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UserService {
  private readonly _dbPath: string = '/chat-users/';

  user: ChatUser;

  constructor(private db: AngularFireDatabase, private authService: AuthService) { }

  createOrUpdate(user: firebase.User) {
    let newUser: ChatUser;
    this.getUser(user.uid).take(1).subscribe(chatUser => {
      if (chatUser && chatUser.id == user.uid) {
        newUser = chatUser;
        newUser.displayName = user.displayName;
        newUser.email = user.email;
        newUser.lastVisitDate = new Date().getTime();
      } else {
        newUser = new ChatUser(user.uid,
          {
            email: user.email,
            displayName: user.displayName,
            isAdmin: false,
            postCount: 0,
            lastVisitDate: new Date().getTime()
          });
      }
      this.db.object(this._dbPath + user.uid).update(newUser);
      this.user = newUser;
    });
  }

  login() {

  }

  logout() {
    this.user = null;
  }

  private getUser(userId: string): Observable<ChatUser|null> {
     return this.db.object(this._dbPath + userId)
      .snapshotChanges()
      .map(s => { 
        return s.key? new ChatUser(s.key, s.payload.val()) : null;
       });
  }
}
