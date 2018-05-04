import { Message } from './../model/message';
import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {
  urlRegex = /(https?:\/\/[^ ]*)/;
  constructor() { }

  filter(text: string) {
    const match = text.match(this.urlRegex);
    let newText = text;
    let url = null;
    if (match) {
      url = match[1];
      if (url) {
        newText = text.replace(this.urlRegex, " [image] ");
      }
    }
    return [newText, url];
  }
}
