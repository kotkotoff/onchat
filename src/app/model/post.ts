export class Post {
    static urlRegex = /(https?:\/\/[^ ]*)/;
    static youtube = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    static coub = /^(http|https)?:\/\/(www\.)?coub\.com\/view\/([a-zA-Z\d]+)/;
    static directVideo = /^(http|https)?:\/\/(www\.)?([a-zA-Z\.\/_-\d]+)\.(mp4|webm|ogg)/;
    rawData: string;

    text: string;
    imageUrl: string;
    linkUrl: string;
    type: string;
    linkData: string;

    clear() {
        this.rawData = "";
        this.text = "";
        this.imageUrl = "";
        this.type = "";
        this.linkData = "";
        this.imageUrl = "";
    }

    isValid() {
        return this.type;
    }

    imageLoaded() {
        this.type = 'image';
    }

    check() {
        const match = this.rawData.match(Post.urlRegex);
        if (match && match[1]) {
            this.imageUrl = match[1];
            this.text = this.rawData.replace(Post.urlRegex, "");
            if (this.isYoutube()) return;
            if (this.isDirectVideo()) return;
            if (this.isCoub()) return;
        }
    }

    isYoutube() : boolean {
        let match = this.imageUrl.match(Post.youtube);
        if (match &&  match[2] &&  match[2].length == 11) {
            this.type = "youtube";
            this.linkUrl = `https://www.youtube.com/embed/${match[2]}?autoplay=1&showinfo=0`;
            this.imageUrl = `https://img.youtube.com/vi/${match[2]}/0.jpg`;
            return true;
        }
        return false;
      }

      isCoub() : boolean {
        let match = this.imageUrl.match(Post.coub);
        if (match && match[3] && match[3].length == 6) {
            this.type = "coub";
            this.linkUrl = `https://coub.com/embed/${match[3]}`;
            this.imageUrl = 'assets/coub-logo.png';
            
            return true;
        }
        return false;
      }

      isDirectVideo() : boolean {
        let match = this.imageUrl.match(Post.directVideo);
        if (match && match[0]) {
            this.type = "video";
            this.linkUrl = match[0];
            return true;
        }
        return false;
      }
}