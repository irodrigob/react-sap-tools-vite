import { ReturnDTO, ReturnsDTO } from "shared/dto/generalDTO";
import { Messages } from "messageManager/infraestructure/types/msgManagerTypes";
import MessageManagerApplication from "messageManager/application/messageManagerApplication";

export default class MessageManagerController {
	private application: MessageManagerApplication;
	constructor() {
		this.application = new MessageManagerApplication();
	}
	/**
	 * Añade mensajes al modelo
	 * @param messages | Array mensajes
	 * @param keepPreviousMessage | Mantener los previos
	 */
	addMessages(messages: Messages, keepPreviousMessage: boolean = false) {
		this.application.addMessages(messages, keepPreviousMessage);
	}
	/**
	 * Añade mensajes devueltos por el array ReturnDTO de SA^P
	 * @param sapReturn | Lista de mensaje en formato SAP
	 * @param keepPreviousMessage | Mantener la lista de mensajes previo
	 */
	addFromSAPArrayReturn(
		sapReturn: ReturnsDTO,
		keepPreviousMessage: boolean = false
	) {
		this.application.addFromSAPArrayReturn(sapReturn, keepPreviousMessage);
	}
	/**
	 * Añade mensajes devueltos por el array ReturnDTO de SA^P
	 * @param sapReturn | Lista de mensaje en formato SAP
	 * @param keepPreviousMessage | Mantener la lista de mensajes previo
	 */
	addFromSAPReturn(sapReturn: ReturnDTO, keepPreviousMessage: boolean = false) {
		this.application.addFromSAPArrayReturn(
			Array(sapReturn),
			keepPreviousMessage
		);
	}
	/**
	 * Limpieza de variables
	 */
	clearVariables() {
		this.application.clearVariables();
	}
}
