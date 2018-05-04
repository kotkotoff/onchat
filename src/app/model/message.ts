
export class Message {
    id: string;
    text: string;
    date: number;
    name: string;
    userId: string;

    constructor(id: string, m: Partial<Message> ) {
        this.id = id;
        this.text = m.text;
        this.date = m.date;
        this.name = m.name;
        this.userId = m.userId;
    }

    static create(text: string, userId: string, name: string) : Message {

        let date = new Date().getTime();
        let m = new Message('', {text, userId, name, date} );
        return m;
    }

    getDate() {
        return new Date(this.date);
    }

    belongsTo(userId: string) : boolean  {
        return this.userId == userId;
    }
}

