export default class UsersPrivilegeNews {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.newsView = false;
    this.newsAdd = false;
    this.newsUpdate = false;
    this.newsArchive = false;
    this.newsRestore = false;
    this.newsDelete = false;
  }
  fillData(data) {
    if (data) {
      this.newsView = data.newsView;
      this.newsAdd = data.newsAdd;
      this.newsUpdate = data.newsUpdate;
      this.newsArchive = data.newsArchive;
      this.newsRestore = data.newsRestore;
      this.newsDelete = data.newsDelete;
    } else {
      this.setInitialValue();
    }
  }
}
