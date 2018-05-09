import { Post } from "./post";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MediaType } from "./media-type";

@Injectable()
export class LinkParser {
  static urlRegex = /(https?:\/\/[^ ]*)/;
  static youtube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  static coub = /^(http|https)?:\/\/(www\.)?coub\.com\/view\/([a-zA-Z\d]+)/;
  static directVideo = /^(http|https)?:\/\/(www\.)?([a-zA-Z\.\/_-\d]+)\.(mp4|webm|ogg)/;
  static vimeo = /^(http|https)?:\/\/(www\.)?([a-zA-Z\.]+)?vimeo\.com([a-zA-Z\.\/]+)\/([a-zA-Z\d]+)/;

  constructor(private http: HttpClient) {}

  check(post: Post) {
    post.type = null;
    const match = post.rawData.match(LinkParser.urlRegex);
    if (match && match[1]) {
      post.type = MediaType.Image;
      post.imageUrl = match[1];
      if (this.checkYoutube(post) || this.checkDirectVideo(post) || this.checkCoub(post) || this.checkVimeo(post)) {
        return;
      }
    }
  }

  private checkYoutube(post: Post): boolean {
    const match = post.imageUrl.match(LinkParser.youtube);
    if (match && match[2] && match[2].length === 11) {
      post.type = MediaType.Youtube;
      post.linkUrl = `https://www.youtube.com/embed/${match[2]}?autoplay=1&showinfo=0`;
      post.imageUrl = `https://img.youtube.com/vi/${match[2]}/0.jpg`;
      return true;
    }
    return false;
  }

  private checkCoub(post: Post): boolean {
    const match = post.imageUrl.match(LinkParser.coub);
    if (match && match[3] && match[3].length === 6) {
      post.type = MediaType.Coub;
      post.linkUrl = `https://coub.com/embed/${match[3]}?autoplay=true`;
      this.http.get<any>(`http://iframe.ly/api/iframely?url=http://coub.com/view/${match[3]}&api_key=792115ede4cc4184e6a1c3`)
      .take(1).subscribe(r => {
        post.imageUrl = r.links.thumbnail[0].href;
      });
      return true;
    }
    return false;
  }

  private checkDirectVideo(post: Post): boolean {
    const match = post.imageUrl.match(LinkParser.directVideo);
    if (match && match[0]) {
      post.type = MediaType.Video;
      post.linkUrl = match[0];
      post.imageUrl = null;
      return true;
    }
    return false;
  }

  private checkVimeo(post: Post): boolean {
    const match = post.imageUrl.match(LinkParser.vimeo);
    if (match && match[5] && match[5].length === 8) {
      post.type = MediaType.Vimeo;
      post.linkUrl = `https://player.vimeo.com/video/${match[5]}?autoplay=true`;
      this.http.get<any>(`https://vimeo.com/api/oembed.json?url=http%3A%2F%2Fvimeo.com%2F${match[5]}`)
      .take(1).subscribe(r => {
        post.imageUrl = r.thumbnail_url;
      });
      return true;
    }
    return false;
  }
}

