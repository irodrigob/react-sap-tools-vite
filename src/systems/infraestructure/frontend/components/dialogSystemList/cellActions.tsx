import { FC, useCallback } from "react";
import { FlexBox, Icon } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/upload-to-cloud";
import "@ui5/webcomponents-icons/dist/toaster-down";
import SystemController from "systems/infraestructure/controller/systemController";
import { useTranslations } from "translations/i18nContext";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import TunnelController from "tunnelSystem/infraestructure/controller/tunnelController";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import DownloadFile from "shared/utils/file/download";

interface Props {
  valor: string;
}

const CellActions: FC<Props> = (instance: any) => {
  const { getI18nText } = useTranslations();
  const { systemsList, tunnelConfiguration } = useSystemData();
  const tunnelController = new TunnelController();
  const systemController = new SystemController();
  const { showMessage } = useMessages();

  const showErrorMessage = useCallback((error: ErrorGraphql) => {
    showMessage(
      getI18nText("tunneling.errorGetTunnels", {
        errorService: error.getError().singleMessage,
      }),
      MessageType.error
    );
  }, []);

  /**
   * Actualiza el tunel de conexión de un sistema
   * @param systemID | ID del sistema
   * @returns | Resultado del proceso
   */
  const updateSystemTunnel = useCallback(
    async (systemID: string): Promise<void> => {
      /*
      let system = systemsList.find((row) => row._id == systemID) as System;
      let tunnels = await tunnelController.getTunnels(
        system.ngrok_api_token as string
      );
      if (tunnels.isSuccess) {
        let tunnelsList = tunnels.getValue() as Tunnel[];
        // Tiene que haber tuneles
        if (tunnelsList.length > 0) {
          // Se mira que exista algún tunel para el sistema seleccionado
          let tunnelSystemSelected = tunnelsList.find(
            (row) => row.forwards_to.indexOf(system.host) != -1
          ) as Tunnel;
          if (tunnelSystemSelected) {
            let resultUpdate = await systemController.updateConnectionTunnel(
              system._id,
              tunnelSystemSelected.public_url
            );
            // Si se actualiza correctamente se actualiza en el modelo de datos
            if (resultUpdate.isSuccess) {
              updateSystem(resultUpdate.getValue() as System);

              showToast(
                getI18nText("tunneling.connectionTunelUpdated"),
                MESSAGE.TYPE.INFO
              );
            } else if (resultUpdate.isFailure) {
              showErrorMessage(tunnels.getErrorValue() as ErrorGraphql);
            }
          } else {
            showToast(
              getI18nText("tunneling.noTunnelSystemSelected"),
              MESSAGE.TYPE.INFO
            );
          }
        } else {
          showToast(
            getI18nText("tunneling.noTunnelsConnected"),
            MESSAGE.TYPE.INFO
          );
        }
      } else if (tunnels.isFailure) {
        showErrorMessage(tunnels.getErrorValue() as ErrorGraphql);
      }
      // Devuelve un promise vacio porque la función tengo que ponerla en async para hacer los await porque no quiero
      // encadenar llamadas. Es un guarrada no es limpio pero ahora mismo no quiero complicarme la vida.
      return new Promise((resolve, reject) => {});*/
    },
    [systemsList]
  );

  /*
<Icon
            name="upload-to-cloud"
            showTooltip={true}
            interactive={true}
            onClick={() => {
              if (instance.row.original.ngrok_api_token != "") {
                updateSystemTunnel(instance.row.original._id);
              } else {
                showToast(
                  getI18nText("tunneling.noAPIToken"),
                  MESSAGE.TYPE.INFO
                );
              }
            }}
          />
*/
  return (
    <FlexBox>
      {instance.row.original.use_connection_tunnel && (
        <>
          <Icon
            interactive={true}
            name="toaster-down"
            showTooltip={true}
            style={{ marginLeft: "1em" }}
            onClick={() => {
              tunnelController.downloadLaunchTunnelConnection(
                instance.row.original.name,
                instance.row.original.host,
                tunnelConfiguration
              );
            }}
          />
        </>
      )}
    </FlexBox>
  );
};

export default CellActions;
