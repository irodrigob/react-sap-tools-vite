import { ReturnDTO, ReturnsDTO } from "shared/dto/generalDTO";
export interface userOrdersDTO {
  taskHasObjects: boolean;
  taskStatusDesc: string;
  taskStatus: string;
  taskTypeDesc: string;
  taskType: string;
  taskUser: string;
  task: string;
  taskDesc: string;
  orderHasObjects: boolean;
  orderTypeDesc: string;
  orderType: string;
  orderStatusDesc: string;
  orderStatus: string;
  orderUser: string;
  orderDesc: string;
  order: string;
}

export interface transportCopyDTO {
  order: string;
  systemTransport: string;
  return: ReturnsDTO;
}

export interface releaseOrdersDTO {
  order: string;
  task: string;
  status: string;
  statusDesc: string;
  return: ReturnDTO;
}

export type releaseOrdersDTOArray = releaseOrdersDTO[];

export interface OrderObjectDTO {
  order: string;
  as4pos: string;
  pgmid: string;
  object: string;
  objectDesc: string;
  objName: string;
  objfunc?: string;
  lockflag: string;
  gennum?: string;
  lang: string;
  activity: string;
}
export type OrderObjectsDTO = OrderObjectDTO[];

export interface DeleteOrderDTO {
  order: string;
  task: string;
  return: ReturnDTO;
}
export type DeleteOrdersDTO = DeleteOrderDTO[];
