export class ChatUser {
  email: string;
  displayName: string;
  isAdmin: boolean;

  constructor(public id: string, user: Partial<ChatUser>) {
    this.email = user.email;
    this.displayName = user.displayName;
    this.isAdmin = user.isAdmin;
  }
}
