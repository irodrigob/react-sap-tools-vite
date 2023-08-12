export default class TunnelProvider {
  readonly provider: string;
  readonly providerName: string;

  constructor(provider: string, providerName: string) {
    this.provider = provider;
    this.providerName = providerName;
  }
}
