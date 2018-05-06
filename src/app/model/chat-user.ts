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
}
