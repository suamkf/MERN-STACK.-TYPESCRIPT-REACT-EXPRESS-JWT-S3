export default class Video {
  title: string;
  url: string;
  description: string;

  constructor(_title: string, _url: string, _description: string) {
    this.title = _title;
    this.url = _url;
    this.description = _description;
  }
}
