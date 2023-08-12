import { gql } from "@apollo/client";
import graphQLRepository from "shared/infraestructure/repository/graphQLRepository";
import TransportOrderRepositoryInterface from "sap/transportOrder/domain/interfaces/transportOrderRepositoryInterface";
import SystemsTransport from "sap/transportOrder/domain/entities/systemsTransport";
import {
  userOrdersDTO,
  transportCopyDTO,
  releaseOrdersDTOArray,
  OrderObjectsDTO,
  DeleteOrdersDTO,
} from "sap/transportOrder/infraestructure/dto/transportOrderDTO";
import UpdateOrder from "sap/transportOrder/domain/entities/updateOrder";
import NewOrder from "sap/transportOrder/domain/entities/newOrder";
import {
  FiltersOrdersGraphQL,
  Orders,
  SystemUsers,
  OrderObjectKey,
  OrderObjectsKey,
} from "sap/transportOrder/infraestructure/types/transport";
import { ReturnsDTO } from "shared/dto/generalDTO";

export const MAIN_ORDERS_FIELDS = gql`
  fragment MainOrdersFields on userOrder {
    taskHasObjects
    taskStatusDesc
    taskStatus
    taskTypeDesc
    taskType
    taskUser
    task
    taskDesc
    orderHasObjects
    orderTypeDesc
    orderType
    orderStatusDesc
    orderStatus
    orderUser
    orderDesc
    order
  }
`;

export const QUERY_USER_ORDERS = gql`
  query Query(
    $system: String!
    $sap_user: String!
    $sap_password: String!
    $user: String!
    $orderStatus: [inputStatus]
    $orderTypes: [inputTypes]
    $releaseDateFrom: String
    $completeProjects: Boolean
  ) {
    getUserOrder(
      system: $system
      sap_user: $sap_user
      sap_password: $sap_password
      user: $user
      orderStatus: $orderStatus
      orderTypes: $orderTypes
      releaseDateFrom: $releaseDateFrom
      completeProjects: $completeProjects
    ) {
      ...MainOrdersFields
    }
  }
  ${MAIN_ORDERS_FIELDS}
`;

export const QUERY_SYSTEMS_TRANSPORT = gql`
  query Query(
    $system: String!
    $sap_user: String!
    $sap_password: String!
    $langu: String!
  ) {
    getSystemsTransport(
      system: $system
      sap_user: $sap_user
      sap_password: $sap_password
      langu: $langu
    ) {
      systemName
      systemDesc
    }
  }
`;

export const QUERY_DO_TRANSPORT = gql`
  query Query($input: inputTransportCopy) {
    doTransportCopy(input: $input) {
      order
      return {
        type
        message
      }
    }
  }
`;
export const UPDATE_ORDER = gql`
  mutation Mutation($input: inputUpdateOrder) {
    updateOrder(input: $input)
  }
`;

export const QUERY_SYSTEMS_USERS = gql`
  query Query($system: String!, $sap_user: String!, $sap_password: String!) {
    getSystemsUsers(
      system: $system
      sap_user: $sap_user
      sap_password: $sap_password
    ) {
      user
      userDesc
    }
  }
`;

export const RELEASE_ORDER = gql`
  query Query(
    $system: String!
    $sap_user: String!
    $sap_password: String!
    $orders: [inputOrders]
    $langu: String!
  ) {
    releaseOrders(
      system: $system
      sap_user: $sap_user
      sap_password: $sap_password
      orders: $orders
      langu: $langu
    ) {
      order
      status
      statusDesc
      task
      return {
        message
        type
      }
    }
  }
`;

export const ORDER_OBJECTS = gql`
  query Query(
    $system: String!
    $sap_user: String!
    $sap_password: String!
    $orders: [inputOrders]
    $langu: String!
  ) {
    getOrderObjects(
      system: $system
      sap_user: $sap_user
      sap_password: $sap_password
      orders: $orders
      langu: $langu
    ) {
      order
      as4pos
      pgmid
      object
      objectDesc
      objName
      objfunc
      lockflag
      gennum
      lang
      activity
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation Mutation($input: inputDeleteOrder) {
    deleteOrder(input: $input)
  }
`;

export const NEW_ORDER = gql`
  mutation Mutation($input: inputNewOrder) {
    newOrder(input: $input) {
      ...MainOrdersFields
    }
  }
  ${MAIN_ORDERS_FIELDS}
`;

export const DELETE_ORDER_OBJECT = gql`
  mutation Mutation($input: inputDeleteOrderObject) {
    deleteOrderObject(input: $input) {
      pgmid
      order
      object
      objName
    }
  }
`;

export const MOVE_ORDER_OBJECTS = gql`
  mutation Mutation($input: inputMoveOrderObjects) {
    moveOrderObjects(input: $input) {
      type
      message
    }
  }
`;

export default class TransportOrderRepository
  extends graphQLRepository
  implements TransportOrderRepositoryInterface
{
  async getUserOrdersList(
    system: string,
    sapUser: string,
    sapPassword: string,
    user: string,
    paramsService: FiltersOrdersGraphQL
  ): Promise<userOrdersDTO[]> {
    const response = await this._apolloClient.query({
      query: QUERY_USER_ORDERS,
      fetchPolicy: "network-only",
      variables: {
        system: system,
        sap_user: sapUser,
        sap_password: sapPassword,
        user: user,
        ...paramsService,
      },
    });
    return response.data.getUserOrder;
  }
  async getSystemsTransport(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string
  ): Promise<SystemsTransport[]> {
    const response = await this._apolloClient.query({
      query: QUERY_SYSTEMS_TRANSPORT,
      fetchPolicy: "network-only",
      variables: {
        system: system,
        sap_user: sapUser,
        sap_password: sapPassword,
        langu: language,
      },
    });
    return response.data.getSystemsTransport.map((row: any) => {
      return new SystemsTransport(row.systemName, row.systemDesc);
    });
  }

  async doTransportCopy(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    systemTransport: string,
    description: string,
    orders: Orders
  ): Promise<transportCopyDTO> {
    const response = await this._apolloClient.query({
      query: QUERY_DO_TRANSPORT,
      fetchPolicy: "network-only",
      variables: {
        input: {
          system: system,
          sap_user: sapUser,
          sap_password: sapPassword,
          langu: language,
          orders: orders,
          systemTransport: systemTransport,
          description: description,
        },
      },
    });
    return response.data.doTransportCopy;
  }
  async updateOrder(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    orderData: UpdateOrder
  ): Promise<void> {
    const response = await this._apolloClient.mutate({
      mutation: UPDATE_ORDER,
      variables: {
        input: {
          system: system,
          sap_user: sapUser,
          sap_password: sapPassword,
          langu: language,
          order: orderData.order,
          description: orderData.description,
          user: orderData.user,
        },
      },
    });
    return response.data.updateOrder;
  }
  async getSystemsUsers(
    system: string,
    sapUser: string,
    sapPassword: string
  ): Promise<SystemUsers> {
    const response = await this._apolloClient.query({
      query: QUERY_SYSTEMS_USERS,
      fetchPolicy: "network-only",
      variables: {
        system: system,
        sap_user: sapUser,
        sap_password: sapPassword,
      },
    });
    return response.data.getSystemsUsers;
  }
  async releaseOrders(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    orders: Orders
  ): Promise<releaseOrdersDTOArray> {
    const response = await this._apolloClient.query({
      query: RELEASE_ORDER,
      fetchPolicy: "network-only",
      variables: {
        system: system,
        sap_user: sapUser,
        sap_password: sapPassword,
        langu: language,
        orders: orders,
      },
    });
    return response.data.releaseOrders;
  }
  async getOrderObjects(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    orders: Orders
  ): Promise<OrderObjectsDTO> {
    const response = await this._apolloClient.query({
      query: ORDER_OBJECTS,
      fetchPolicy: "network-only",
      variables: {
        system: system,
        sap_user: sapUser,
        sap_password: sapPassword,
        langu: language,
        orders: orders,
      },
    });

    return response.data.getOrderObjects;
  }
  async deleteOrder(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    order: string
  ): Promise<DeleteOrdersDTO> {
    const response = await this._apolloClient.mutate({
      mutation: DELETE_ORDER,
      variables: {
        input: {
          system: system,
          sap_user: sapUser,
          sap_password: sapPassword,
          langu: language,
          order: order,
        },
      },
    });
    return response.data.deleteOrder;
  }
  async newOrder(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    order: NewOrder
  ): Promise<userOrdersDTO> {
    const response = await this._apolloClient.mutate({
      mutation: NEW_ORDER,
      variables: {
        input: {
          system: system,
          sap_user: sapUser,
          sap_password: sapPassword,
          langu: language,
          description: order.description,
          type: order.type,
          user: order.user,
        },
      },
    });
    return response.data.newOrder;
  }
  async deleteOrderObject(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    objectData: OrderObjectKey
  ): Promise<OrderObjectKey> {
    const response = await this._apolloClient.mutate({
      mutation: DELETE_ORDER_OBJECT,
      variables: {
        input: {
          system: system,
          sap_user: sapUser,
          sap_password: sapPassword,
          langu: language,
          order: objectData.order,
          pgmid: objectData.pgmid,
          object: objectData.object,
          objName: objectData.objName,
        },
      },
    });
    return response.data.deleteOrderObject;
  }
  async moveOrderObjects(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    orderTo: string,
    orderObjects: OrderObjectsKey
  ): Promise<ReturnsDTO> {
    const response = await this._apolloClient.mutate({
      mutation: MOVE_ORDER_OBJECTS,
      variables: {
        input: {
          system: system,
          sap_user: sapUser,
          sap_password: sapPassword,
          langu: language,
          orderTo: orderTo,
          orderObjects: orderObjects.map((row) => {
            return {
              order: row.order,
              pgmid: row.pgmid,
              object: row.object,
              objName: row.objName,
            };
          }),
        },
      },
    });
    return response.data.moveOrderObjects;
  }
}
