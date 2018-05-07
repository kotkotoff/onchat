export class Comments {
  id: string;

  list: Comment[];

  constructor(id: string, comments: Partial<Comment>[]) {
    this.id = id;
    if (comments) {
      this.list = comments.map(c => new Comment(c)).sort((a, b) => a.date - b.date);
    }
  }
}

export class Comment {
  userName: string;
  comment: string;
  date: number;

  constructor(comment: Partial<Comment>) {
    this.userName = comment.userName;
    this.comment = comment.comment;
    this.date = comment.date;
  }
}
