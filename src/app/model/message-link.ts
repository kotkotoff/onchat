
export class MessageLink {
    type: string;
    imageUrl?: string;
    linkUrl?: string;

    constructor(ml: Partial<MessageLink>) {
      this.imageUrl = ml.imageUrl;
      this.linkUrl = ml.linkUrl;
      this.type = ml.type;
    }
  }