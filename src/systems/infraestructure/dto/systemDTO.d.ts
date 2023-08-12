export interface newSystemDTO {
  user: string;
  name: string;
  host: string;
  sap_user: string;
  sap_password: string;
  use_connection_tunnel?: boolean;
  url_manual_tunnel?: string;
}
