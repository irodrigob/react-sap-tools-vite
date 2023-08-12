export default class UserInfo {
  readonly user: string;
  readonly userDesc: string;

  constructor(user: string, userDesc: string) {
    this.user = user;
    this.userDesc = userDesc;
  }
}
