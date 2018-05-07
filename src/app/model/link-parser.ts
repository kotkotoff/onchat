import { Post } from "./post";

export class LinkParser {
  static urlRegex = /(https?:\/\/[^ ]*)/;
  static youtube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  static coub = /^(http|https)?:\/\/(www\.)?coub\.com\/view\/([a-zA-Z\d]+)/;
  static directVideo = /^(http|https)?:\/\/(www\.)?([a-zA-Z\.\/_-\d]+)\.(mp4|webm|ogg)/;

  check(post: Post) {
    const match = post.rawData.match(LinkParser.urlRegex);
    if (match && match[1]) {
      post.imageUrl = match[1];
      post.text = post.rawData.replace(LinkParser.urlRegex, "");
      if (this.checkYoutube(post) || this.checkDirectVideo(post) || this.checkCoub(post)) {
        return;
      }
    }
  }

  private checkYoutube(post: Post): boolean {
    const match = post.imageUrl.match(LinkParser.youtube);
    if (match && match[2] && match[2].length === 11) {
      post.type = "youtube";
      post.linkUrl = `https://www.youtube.com/embed/${match[2]}?autoplay=1&showinfo=0`;
      post.imageUrl = `https://img.youtube.com/vi/${match[2]}/0.jpg`;
      return true;
    }
    return false;
  }

  private checkCoub(post: Post): boolean {
    const match = post.imageUrl.match(LinkParser.coub);
    if (match && match[3] && match[3].length === 6) {
      post.type = "coub";
      post.linkUrl = `https://coub.com/embed/${match[3]}`;
      post.imageUrl = "assets/coub-logo.png";
      return true;
    }
    return false;
  }

  private checkDirectVideo(post: Post): boolean {
    const match = post.imageUrl.match(LinkParser.directVideo);
    if (match && match[0]) {
      post.type = "video";
      post.linkUrl = match[0];
      return true;
    }
    return false;
  }
}
