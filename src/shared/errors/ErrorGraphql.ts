import ErrorBase from "shared/errors/ErrorBase";
export default class ErrorGraphql extends ErrorBase {
	static create(oErrorGraphQL: any) {
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
			let messages: string[] = [];

			// Se extrae los mensajes, que pueden provenir del propio graphql o del backend
			oErrorGraphQL.graphQLErrors.forEach((sRow: any) => {
				// Cuando son errores que vienen de excepciones generadas por el gateway de SAP, los mensajes están en un nodo
				// concreto de la respuesta.
				if (
					sRow?.extensions?.backendResponse?.error?.innererror?.errordetails &&
					sRow.extensions.backendResponse.error.innererror.errordetails.length >
						1
				) {
					sRow.extensions.backendResponse.error.innererror.errordetails.map(
						(rowDetails: any) => {
							// En las excepcion en GW siempre me incluye la excepción propia del GW y no la quiero
							if (!rowDetails.code.includes("/IWBEP/CX_MGW_BUSI_EXCEPTION")) {
								messages.push(rowDetails.message);
							}
						}
					);
				} else {
					messages.push(
						sRow?.extensions?.backendResponse?.error?.message.value ??
							sRow.message
					);
				}
			});

			return new ErrorGraphql({
				networkError: false,
				singleMessage:
					messages.length > 0
						? messages[0]
						: oErrorGraphQL.graphQLErrors[0].message,
				messages: messages,
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
