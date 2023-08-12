import validationBase from "shared/validations/validationBase";

export default class SystemApplicationValidations extends validationBase {
  constructor() {
    super();
  }
  validateHost(host: string): boolean {
    if (host.length > 0 && host.match(/(^http[s]?:\/{2})|(^\/{1,2})/g) == null)
      return false;
    else return true;
  }
}
