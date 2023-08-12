import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import ErrorGeneral from "shared/errors/errorGeneral";
import UserInfo from "sap/general/domain/entities/userInfo";
import AppsList from "sap/general/domain/entities/appsList";
import {
  userOrdersDTO,
  transportCopyDTO,
  releaseOrdersDTO,
  releaseOrdersDTOArray,
  DeleteOrdersDTO,
} from "sap/transportOrder/infraestructure/dto/transportOrderDTO";
import {
  OrderObjectKey,
  OrdersTreeTable,
  SystemUsers,
} from "sap/transportOrder/infraestructure/types/transport";
import SystemsTransport from "sap/transportOrder/domain/entities/systemsTransport";
import { OrderObjects } from "sap/transportOrder/infraestructure/types/transport";
import NewOrder from "sap/transportOrder/domain/entities/newOrder";
import { SelectableOrders } from "sap/transportOrder/domain/entities/selectableOrders";
import { ReturnsDTO } from "shared/dto/generalDTO";

export type responseUserOrdersList =
  | Result<userOrdersDTO[]>
  | Result<ErrorGeneral>
  | Result<ErrorGraphql>;

export type responseSystemsTransport =
  | Result<SystemsTransport[]>
  | Result<ErrorGraphql>;

export type responseDoTransportCopy =
  | Result<transportCopyDTO>
  | Result<ErrorGraphql>;

export type responseUpdateOrder = Result<void> | Result<ErrorGraphql>;

export type responseSystemsUsers = Result<SystemUsers> | Result<ErrorGraphql>;

export type responseReleaseOrders =
  | Result<releaseOrdersDTOArray>
  | Result<ErrorGraphql>;

export type responseReleaseOrders =
  | Result<releaseOrdersDTOArray>
  | Result<ErrorGraphql>;

export type responseGetOrderObjects =
  | Result<OrderObjects>
  | Result<ErrorGraphql>;

export type responseDeleteOrders = Result<void> | Result<ErrorGraphql>;

export type responseNewOrder = Result<userOrdersDTO> | Result<ErrorGraphql>;

export type responseDeleteOrderObject =
  | Result<OrderObjectKey>
  | Result<ErrorGraphql>;

export type responseSelectableOrders =
  | Result<SelectableOrders>
  | Result<ErrorGraphql>;

export type responseMoveOrderObjects =
  | Result<ReturnsDTO>
  | Result<ErrorGraphql>;
