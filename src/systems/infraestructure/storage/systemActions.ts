import AppStore from "shared/storage/appStore";
import {
  setSystemSelected,
  setConnectedToSystem,
  setURL2ConnectSystem,
  setOpenEditSystem,
  setOperationEdit,
  setSystemEdit,
} from "./systemSlice";
import System from "systems/domain/entities/system";
import { type OperationEdit } from "systems/infraestructure/types/system";

export default class SystemActions extends AppStore {
  setSystemSelected(system: System) {
    this.dispatch(setSystemSelected(system));
  }
  setConnectedToSystem(value: boolean) {
    this.dispatch(setConnectedToSystem(value));
  }
  setURL2ConnectSystem(value: string) {
    this.dispatch(setURL2ConnectSystem(value));
  }
  setOpenEditSystem(value: boolean) {
    this.dispatch(setOpenEditSystem(value));
  }
  setOperationEdit(operation: OperationEdit) {
    this.dispatch(setOperationEdit(operation));
  }
  setSystemEdit(system: System | null) {
    this.dispatch(setSystemEdit(system));
  }
}
