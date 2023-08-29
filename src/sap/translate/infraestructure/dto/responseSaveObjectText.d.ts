import ObjectTextToSaveDTO from "./setObjectTextDTO";
import { ReturnDTO } from "shared/dto/generalDTO";
export default interface ResponseSaveObjectText {
  objectText: ObjectTextToSaveDTO;
  return: ReturnDTO;
}
