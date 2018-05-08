import { ChatUser } from "./chat-user";
import { Post } from "./post";
import { MessageLink } from "./message-link";

export class Message {
    id: string;
    date: number;
    name: string;
    userId: string;
    messageLink: MessageLink;
    hasComments?: false;
    likes?: string[];

    constructor(id: string, m: Partial<Message>) {
        this.id = id;
        this.date = m.date;
        this.name = m.name;
        this.userId = m.userId;
        this.messageLink = m.messageLink;
        this.hasComments = m.hasComments;
        this.likes = m.likes;
    }

    static create(userId: string, name: string, messageLink: MessageLink): Message {
        const date = new Date().getTime();
        return new Message('', {userId, name, date, messageLink, hasComments: false, likes: []} );
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

