import ErrorBase from "shared/errors/ErrorBase";
export default class ErrorGraphql extends ErrorBase {
  static create(oErrorGraphQL:any) {
    // Error en la llamada al servicio. Se produce el servicio peta y da un HTTP 400 o similares.
    if (oErrorGraphQL.networkError) {
      let networkError = oErrorGraphQL.networkError;

      return new ErrorGraphql({
        networkError: true,
        HTTPStatusCode: networkError.statusCode,
        singleMessage: networkError.result?.errors[0].message
          ? networkError.result.errors[0].message
          : networkError.result?.message
          ? networkError.result.message
          : oErrorGraphQL.message,
        messages: networkError.result?.errors,
      });
    } else if (oErrorGraphQL.graphQLErrors) {
      // oErrorGraphQL.graphQLErrors[0].extensions.backendResponse.error.message.value
      return new ErrorGraphql({
        networkError: false,
        singleMessage:
          oErrorGraphQL.graphQLErrors[0]?.extensions?.backendResponse?.error
            ?.message.value ?? oErrorGraphQL.graphQLErrors[0].message,
        messages: oErrorGraphQL.graphQLErrors.map(
          (sRow:any) =>
            sRow?.extensions?.backendResponse?.error?.message.value ??
            sRow.message
        ),
      });
    } else {
      return new ErrorGraphql({
        networkError: false,
        singleMessage: oErrorGraphQL.message,
        messages: [],
      });
    }
  }
}
