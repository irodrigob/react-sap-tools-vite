import { EditableRowsField } from "sap/transportOrder/infraestructure/types/transport";

export const initialrowDataForUpdate: EditableRowsField = {
  orderTask: "",
  description: "",
  description_error: false,
  description_message: "",
  user: "",
  user_error: false,
  user_message: "",
  parent_order: "",
  levelTree: "order",
};
