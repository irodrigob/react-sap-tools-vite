import { ValueState } from "@ui5/webcomponents-react";
import Object from "sap/transportOrder/domain/entities/object";
import OrderObjectBase from "sap/transportOrder/domain/entities/orderObjectBase";
import OrderObject from "sap/transportOrder/domain/entities/orderObject";

export interface FilterType {
  code: string;
  text: string;
  selected: boolean;
}

export interface ToolbarFilters {
  orderTypes: FilterType[];
  orderStatus: FilterType[];
  releaseDateFrom: string | null;
}

export interface ToolbarFiltersState {
  orderTypes: ValueState;
  orderTypesDesc: string;
  orderStatus: ValueState;
  orderStatusDesc: string;
  releaseDate: ValueState;
  releaseDateDesc: string;
}

export interface FilterOrderTypeGraphQL {
  type: string;
}
export interface FilterOrderStatusGraphQL {
  status: string;
}

export interface FiltersOrdersGraphQL {
  orderTypes: FilterOrderTypeGraphQL[];
  orderStatus: FilterOrderStatusGraphQL[];
  releaseDateFrom?: string | null;
  completeProjects?: boolean | null;
}

export const LevelTreeValues = {
  order = "order",
  task = "task",
};
// Nota: los enum no me funciona con el webpack tengo que hacerlo de esta manera.
// No me gusta nada, pero cuando migre esto en Vite creo que solucionara.
export type LevelTreeType = "order" | "task";

export interface FieldsBaseTreeTable {
  row_editing: boolean;
  row_editable: boolean;
  row_deletable: boolean;
  orderTask: string;
  description: string;
  description_edit: boolean;
  status: string;
  statusDesc: string;
  type: string;
  typeDesc: string;
  user: string;
  user_edit: boolean;
  hasObjects: boolean;
  levelTree: LevelTreeType;
}

export interface FieldsTaskTreeTable extends FieldsBaseTreeTable {
  parent_order: string;
}

export interface FieldsOrdersTreeTable extends FieldsBaseTreeTable {
  subRows: FieldsTaskTreeTable[];
}

export interface Order {
  order: string;
}

export type Orders = Order[];

export interface RowExpanded {
  index: number;
  order: string;
}
export type RowsExpanded = RowExpanded[];

export type ValueValidation = number | string;
export interface ReturnGeneralValidations {
  error: boolean;
  message: string;
}
export interface ReturnUserValidations extends ReturnGeneralValidations {
  user?: string;
}
export interface EditableRowsField {
  orderTask: string;
  description: string;
  description_error: boolean;
  description_message: string;
  user: string;
  user_error: boolean;
  user_message: string;
  parent_order?: string;
  levelTree: LevelTreeType;
}

export interface SystemUser {
  user: string;
  userDesc: string;
}
export type SystemUsers = SystemUser[];

export type Objects = Object[];
export type OrderObjects = OrderObject[];

export interface OrderObjectSelected {
  order: string;
  description: string;
  row_editable: boolean;
  type: string;
  user: string;
  parent_order: string;
}
export type OrderObjectsSelected = OrderObjectSelected[];

export interface OrderObjectTable extends OrderObjectBase, Object {
  description: string;
  row_editable: boolean;
}
export type OrderObjectsTable = OrderObjectTable[];

export type OrderObjectKey = {
  order: string;
  parent_order?: string;
  pgmid: string;
  object: string;
  objName: string;
};
export type OrderObjectsKey = OrderObjectKey[];
