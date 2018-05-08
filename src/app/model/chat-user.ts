import { User } from "firebase";

export class ChatUser {
  email: string;
  displayName: string;
  isAdmin: boolean;
  lastVisitDate: number;
  postCount: number;

  constructor(public id: string, user: Partial<ChatUser>) {
    this.email = user.email;
    this.displayName = user.displayName;
    this.isAdmin = user.isAdmin;
    this.lastVisitDate = user.lastVisitDate;
    this.postCount = user.postCount;
  }

  static create(user: User): ChatUser {
    return new ChatUser(user.uid,
      {
        email: user.email,
        displayName: user.displayName,
        isAdmin: false,
        postCount: 0,
        lastVisitDate: new Date().getTime()
      });
  }

  updateFrom(user: User) {
    this.displayName = user.displayName;
    this.email = user.email;
    this.lastVisitDate = new Date().getTime();
  }
}
