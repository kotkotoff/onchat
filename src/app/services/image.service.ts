import { Message } from './../model/message';
import { Injectable } from '@angular/core';
import { Post } from '../model/post';

@Injectable()
export class ImageService {
  urlRegex = /(https?:\/\/[^ ]*)/;
  constructor() { }

  filter(text: string): Post {
    const match = text.match(this.urlRegex);
    let newText = text;
    let url = null;
    if (match) {
      url = match[1];
      if (url) {
        newText = text.replace(this.urlRegex, "");
      }
    }
    return new Post(newText, url);
  }
}
