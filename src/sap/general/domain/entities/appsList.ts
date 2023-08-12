export default class AppsList {
  readonly app: string;
  readonly appDesc: string;
  readonly service: string;
  readonly frontendPage: string;
  readonly icon: string;
  readonly urlHelp: string;

  constructor(
    app: string,
    appDesc: string,
    service: string,
    frontendPage: string,
    icon: string,
    urlHelp?: string
  ) {
    this.app = app;
    this.appDesc = appDesc;
    this.frontendPage = frontendPage;
    this.icon = icon;
    this.service = service;
    this.urlHelp = urlHelp as string;
  }
}
