import { ChatUser } from "./chat-user";
import { MessageLink } from "./message-link";

export class Message {
    id: string;
    date: number;
    name: string;
    userId: string;
    messageLink: MessageLink;
    commentCount?: number;
    likes?: string[];

    constructor(id: string, m: Partial<Message>) {
        this.id = id;
        this.date = m.date;
        this.name = m.name;
        this.userId = m.userId;
        this.messageLink = m.messageLink;
        this.commentCount = m.commentCount;
        this.likes = m.likes;
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

