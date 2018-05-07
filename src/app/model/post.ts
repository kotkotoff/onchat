export class Post {
  rawData: string;
  text: string;
  imageUrl: string;
  linkUrl: string;
  type: string;
  linkData: string;

  clear() {
    this.rawData = this.text = this.imageUrl = this.type = this.linkData = this.imageUrl = "";
  }

  isValid() {
    return this.type;
  }

  imageLoaded() {
    this.type = "image";
  }
}
