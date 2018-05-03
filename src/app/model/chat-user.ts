export class ChatUser {
  email: string;
  displayName: string;

  constructor(public id: string, user: Partial<ChatUser>) {
    this.email = user.email;
    this.displayName = user.displayName;
  }
}
