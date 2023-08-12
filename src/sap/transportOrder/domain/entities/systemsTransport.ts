export default class SystemsTransport {
  readonly systemName: string;
  readonly systemDesc: string;
  constructor(systemName: string, systemDesc: string) {
    this.systemDesc = systemDesc;
    this.systemName = systemName;
  }
}
