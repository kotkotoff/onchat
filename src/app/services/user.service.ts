import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { ChatUser } from './../model/chat-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase, private authService: AuthService) { }

  save(user: firebase.User): void {
    const chatUser = new ChatUser(user.uid,
      {
        email: user.email,
        displayName: user.displayName
      });
    this.db.object('/chat-users/' + user.uid)
      .update(chatUser)
      .then(() => this.cacheUser(chatUser));
  }

  cacheUser(user: ChatUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeCachedUser(): void {
    localStorage.clear();
  }

  getChatUser(): Observable<ChatUser> {
    const user = this.getUserFromCache();
    if (user) { return Observable.of(user); }
    return this.authService.user$
      .switchMap(u => this.getUser(u.uid));
  }

  private getUser(userId: string): Observable<ChatUser> {
    return this.db.object('/chat-users/' + userId)
      .snapshotChanges()
      .map(s => new ChatUser(s.key, s.payload.val()));
  }

  private getUserFromCache(): ChatUser|null {
    try {
      const userJson = localStorage.getItem("user");
      if (!userJson) { return null; }
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }
}
