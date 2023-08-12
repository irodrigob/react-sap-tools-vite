import { useCallback, useEffect, useState } from "react";
import { ValueState } from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import CellActions from "systems/infraestructure/frontend/components/dialogSystemList/cellActions";
import useSystems from "systems/infraestructure/frontend/hooks/useSystems";
import SystemController from "systems/infraestructure/controller/systemController";
import { RowValidations } from "shared/types/validation";
import SystemFormatters from "shared/utils/formatters";
import Encrypt from "shared/utils/encrypt/encrypt";
import System from "systems/domain/entities/system";
import type { responseSystemRepo } from "systems/infraestructure/types/application";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";

export default function useDialogSystemList() {
  const { getI18nText } = useTranslations();
  const [columns, setColumns] = useState<any>([]);
  const systemController = new SystemController();
  const { updateSystem, deleteSystem } = useSystems();
  const { tunnelConfiguration } = useSystemData();
  const { showResultError, showMessage } = useMessages();

  /*************************************
   * Efectos
   ************************************/
  useEffect(() => {
    let newColumns = [
      {
        Cell: CellActions,
        Header: "Actions",
        accessor: "actions",
        disableFilters: true,
        disableGroupBy: true,
        disableResizing: true,
        disableSortBy: true,
        numberIcons: 2,
        id: "actions",
      },
      {
        Header: getI18nText("systems.labelName"),
        accessor: "name",
        headerTooltip: getI18nText("systems.labelName"),
        edit: true,
        required: true,
        width: 200,
      },
      {
        Header: getI18nText("systems.labelHOST"),
        accessor: "host",
        headerTooltip: getI18nText("systems.labelHOST"),
        edit: true,
        required: true,
        width: 400,
      },
      {
        Header: getI18nText("systems.labelSAPUser"),
        accessor: "sap_user",
        headerTooltip: getI18nText("systems.labelSAPUser"),
        edit: true,
        required: true,
        width: 150,
      },
      {
        Header: getI18nText("systems.labelSAPPassword"),
        accessor: "sap_password",
        headerTooltip: getI18nText("systems.labelSAPPassword"),
        edit: true,
        required: true,
        width: 150,
        type: "Password",
      },
      {
        Header: getI18nText("systems.labelUseConnectionTunnel"),
        accessor: "use_connection_tunnel",
        headerTooltip: getI18nText("systems.labelUseConnectionTunnel"),
        edit: true,
        required: false,
        width: 100,
        componentType: "checkbox",
      },
    ];

    if (tunnelConfiguration.authToken == "")
      newColumns.push({
        Header: getI18nText("systems.labelURLManualTunnel"),
        accessor: "url_manual_tunnel",
        headerTooltip: getI18nText("systems.labelURLManualTunnel"),
        edit: true,
        required: false,
        width: 400,
      });
    setColumns(newColumns);
  }, [tunnelConfiguration]);

  /*************************************
   * Funciones
   ************************************/
  /**
   * Validación de datos a nivel de fila
   */
  const rowValidations = useCallback(
    (newData: any, column: string, value: any): RowValidations => {
      switch (column) {
        case "host":
          if (!systemController.validateHost(value))
            return [
              {
                column: column,
                validations: [
                  {
                    state: ValueState.Error,
                    message: getI18nText("editSystem.msgErrorHostInvalid"),
                  },
                ],
              },
            ] as RowValidations;
          break;
        case "use_connection_tunnel":
          if (!value)
            return [
              { column: "url_manual_tunnel", value: "" },
            ] as RowValidations;
          break;
        case "url_manual_tunnel":
          if (newData.use_connection_tunnel) {
            if (!systemController.validateHost(value))
              return [
                {
                  column: column,
                  validations: [
                    {
                      state: ValueState.Error,
                      message: getI18nText("editSystem.msgErrorHostInvalid"),
                    },
                  ],
                },
              ] as RowValidations;
          } else {
            return [{ value: "" }] as RowValidations;
          }
          break;
      }
      return [] as RowValidations;
    },
    []
  );

  /**
   * Actualización de datos
   */
  const rowUpdate = (newData: any, oldData: any): Promise<any> => {
    showMessage(
      getI18nText("editSystem.saveInProcess", {
        newSystem: newData.name,
      }),
      MessageType.info
    );

    return new Promise((resolve, reject) => {
      systemController
        .updateSystem(
          new System(
            newData._id,
            newData.user,
            newData.name,
            SystemFormatters.formatterHost(newData.host),
            newData.sap_user,
            newData.sap_password != oldData.sap_password
              ? Encrypt.encryptText(newData.sap_password)
              : newData.sap_password,
            newData.use_connection_tunnel,
            newData.use_connection_tunnel && tunnelConfiguration.authToken == ""
              ? newData.url_manual_tunnel
              : ""
          )
        )
        .then((response: responseSystemRepo) => {
          if (response.isSuccess) {
            let updatedSystem = response.getValue() as System;
            showMessage(
              getI18nText("editSystem.saveSuccess", {
                newSystem: updatedSystem.name,
              }),
              MessageType.success
            );
            updateSystem(updatedSystem); // Actualización del modelo interno
            resolve("");
          } else if (response.isFailure) {
            showMessage(
              getI18nText("editSystem.errorCallServiceNew", {
                errorService: (
                  response.getErrorValue() as ErrorGraphql
                ).getError().singleMessage,
              }),
              MessageType.error
            );

            reject(
              new Error(
                (
                  response.getErrorValue() as ErrorGraphql
                ).getError().singleMessage
              )
            ); // Lanzo excepción para que se pinta en el listado
          }
        });
    });
  };

  /**
   * Borrado de una fila
   */
  const rowDelete = (oldData: any) => {
    showMessage(
      getI18nText("editSystem.deleteInProcess", {
        newSystem: oldData.name,
      }),
      MessageType.info
    );

    return new Promise((resolve, reject) => {
      systemController
        .deleteSystem(oldData._id)
        .then((response: responseSystemRepo) => {
          if (response.isSuccess) {
            let deletedSystem = response.getValue() as System;

            showMessage(
              getI18nText("editSystem.deleteSuccess", {
                system: deletedSystem.name,
              }),
              MessageType.success
            );

            deleteSystem(deletedSystem._id);
            resolve("");
          } else if (response.isFailure) {
            showMessage(
              getI18nText("editSystem.errorCallServiceNew", {
                errorService: (
                  response.getErrorValue() as ErrorGraphql
                ).getError().singleMessage,
              }),
              MessageType.error
            );

            reject(
              new Error(
                (
                  response.getErrorValue() as ErrorGraphql
                ).getError().singleMessage
              )
            ); // Lanzo excepción para que se pinta en el listado
          }
        });
    });
  };

  return { columns, rowValidations, rowUpdate, rowDelete };
}
