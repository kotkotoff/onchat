import { Post } from "./post";
import { ChatUser } from "./chat-user";

export class Message {
    id: string;
    date: number;
    name: string;
    userId: string;
    post: Post;
    hasComments?: false;
    likes?: string[];

    constructor(id: string, m: Partial<Message>) {
        this.id = id;
        this.date = m.date;
        this.name = m.name;
        this.userId = m.userId;
        this.post = m.post;
        this.hasComments = m.hasComments;
        this.likes = m.likes;
    }

    static create(userId: string, name: string, post: Post): Message {
        const date = new Date().getTime();
        return new Message('', {userId, name, date, post, hasComments: false, likes: []} );
    }

    getDate() {
        return new Date(this.date);
    }

    canEdit(user: ChatUser): boolean  {
        return !!user && (this.userId === user.id || user.isAdmin);
    }

    isLiked(userId: string): boolean {
        return !!this.likes && this.likes.indexOf(userId) > -1;
    }
}

