import { MessageLink } from './message-link';
import { MediaType } from "./media-type";

export class Post extends MessageLink {
  rawData: string;

  constructor() {
    super({type: MediaType.None});
  }

  clear() {
    this.rawData = this.imageUrl = this.linkUrl = "";
    this.type = MediaType.None;
  }


}
