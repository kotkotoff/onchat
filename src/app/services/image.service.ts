import { ImageMessage } from './../model/image-message';
import { Message } from './../model/message';
import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {
  urlRegex = /(https?:\/\/[^ ]*)/;
  constructor() { }

  filter( m : Message) : ImageMessage|null {
    var url = m.text.match(this.urlRegex)[1];
    if (url) {
      return new ImageMessage(url, m);
    }
    return null;
  }
}
