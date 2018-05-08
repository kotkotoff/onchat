
export class Post {
  rawData: string;
  imageUrl: string = null;
  linkUrl: string = null;
  type: string;

  clear() {
    this.rawData = this.imageUrl = this.type = this.linkUrl = "";
  }
}
