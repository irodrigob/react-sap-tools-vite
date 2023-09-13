import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import { ReturnDTO } from "shared/dto/generalDTO";

export default interface ResponseSaveObjectText {
	objectText: ObjectsText;
	return: ReturnDTO;
}
