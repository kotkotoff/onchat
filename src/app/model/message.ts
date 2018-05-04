
export class Message {
    id: string;
    text: string;
    date: number;
    name: string;
    userId: string;
    imageUrl: string;

    constructor(id: string, m: Partial<Message>) {
        this.id = id;
        this.text = m.text;
        this.date = m.date;
        this.name = m.name;
        this.userId = m.userId;
        this.imageUrl = m.imageUrl;
    }

    static create(text: string, userId: string, name: string, imageUrl: string): Message {
        const date = new Date().getTime();
        const m = new Message('', {text, userId, name, date, imageUrl} );
        return m;
    }

    getDate() {
        return new Date(this.date);
    }

    belongsTo(userId: string): boolean  {
        return this.userId === userId;
    }
}

