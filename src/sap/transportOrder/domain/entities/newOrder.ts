export default class NewOrder {
  readonly description: string;
  readonly type: string;
  readonly user: string;
  constructor(description: string, type: string, user: string) {
    this.description = description;
    this.type = type;
    this.user = user;
  }
}
