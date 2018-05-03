
export class Message {
    id: string;
    text: string;
    date: number;
    name: string;

    constructor(id: string, m: Partial<Message> ) {
        this.id = id;
        this.text = m.text;
        this.date = m.date;
        this.name = m.name;
    }

    static create(text: string, name: string) : Message {

        let date = new Date().getTime();
        let m = new Message('', {text, name, date} );
        return m;
    }

    getDate() {
        return new Date(this.date);
    }
}

