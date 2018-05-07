import { Post } from "./post";

export class Message {
    id: string;
    date: number;
    name: string;
    userId: string;
    post: Post;
    hasComments?: false;

    constructor(id: string, m: Partial<Message>) {
        this.id = id;
        this.date = m.date;
        this.name = m.name;
        this.userId = m.userId;
        this.post = m.post;
        this.hasComments = m.hasComments;
    }

    static create(userId: string, name: string, post: Post): Message {
        const date = new Date().getTime();
        return new Message('', {userId, name, date, post, hasComments: false} );
    }

    getDate() {
        return new Date(this.date);
    }

    belongsTo(userId: string): boolean  {
        return this.userId === userId;
    }
}

