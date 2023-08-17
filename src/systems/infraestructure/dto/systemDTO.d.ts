export interface newSystemDTO {
  user: string;
  name: string;
  host: string;
  sap_user: string;
  sap_password: string;
  client: string;
  language: string;
  use_connection_tunnel?: boolean;
  url_manual_tunnel?: string;
}
