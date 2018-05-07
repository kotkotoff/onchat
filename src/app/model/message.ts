import { Post } from "./post";

export class Message {
    id: string;
    date: number;
    name: string;
    userId: string;
    post: Post;
    likes?: number;
    dislikes?: number;

    constructor(id: string, m: Partial<Message>) {
        this.id = id;
        this.date = m.date;
        this.name = m.name;
        this.userId = m.userId;
        this.post = m.post;
        this.likes = m.likes;
        this.dislikes = m.dislikes;
    }

    static create(userId: string, name: string, post: Post): Message {
        const date = new Date().getTime();
        const m = new Message('', {userId, name, date, post} );
        return m;
    }

    getDate() {
        return new Date(this.date);
    }

    belongsTo(userId: string): boolean  {
        return this.userId === userId;
    }
}

