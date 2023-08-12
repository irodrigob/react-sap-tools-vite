import { Objects } from "sap/transportOrder/infraestructure/types/transport";
import OrderObjectBase from "./orderObjectBase";

export default interface OrderObject extends OrderObjectBase {
  objects: Objects;
}
