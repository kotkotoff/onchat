import { Message } from "./message";

export class ImageMessage extends Message {
    imageUrl: string;

    constructor (imageUrl: string, m: Message) {
        super(m.id, m);
        this.imageUrl = imageUrl;
    }
}