export default class UpdateOrder {
  readonly order: string;
  readonly description: string;
  readonly user: string;
  constructor(order: string, description: string, user: string) {
    this.description = description;
    this.order = order;
    this.user = user;
  }
}
