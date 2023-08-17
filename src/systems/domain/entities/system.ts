export default class System {
  readonly _id: string;
  readonly user: string;
  readonly name: string;
  readonly host: string;
  readonly sap_user: string;
  readonly sap_password: string;
  readonly use_connection_tunnel?: boolean;
  readonly url_manual_tunnel?: string;
  readonly client: string;
  readonly language: string;

  constructor(
    _id: string,
    user: string,
    name: string,
    host: string,
    sap_user: string,
    sap_password: string,
    client: string,
    language: string,
    use_connection_tunnel?: boolean,
    url_manual_tunnel?: string
  ) {
    this._id = _id;
    this.user = user;
    this.name = name;
    this.host = host;
    this.sap_user = sap_user;
    this.sap_password = sap_password;
    this.use_connection_tunnel = use_connection_tunnel;
    this.url_manual_tunnel = url_manual_tunnel;
    this.client = client;
    this.language = language;
  }
}
