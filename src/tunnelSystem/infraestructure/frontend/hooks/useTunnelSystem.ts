import { useCallback } from "react";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import TunnelController from "tunnelSystem/infraestructure/controller/tunnelController";
import TunnelConfiguration from "tunnelSystem/domain/entities/configuration";
import TunnelProvider from "tunnelSystem/domain/entities/provider";
import {
  responseTunnelConfigRepo,
  responseTunnelProviderRepoArray,
} from "tunnelSystem/infraestructure/types/repository";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { useTranslations } from "translations/i18nContext";
import ErrorGraphql from "shared/errors/ErrorGraphql";

export default function useTunnelSystem() {
  const { setTunnelConfiguration, setTunnelProviders } = useSystemData();
  const tunnelController = new TunnelController();
  const { getI18nText } = useTranslations();
  const { showMessage } = useMessages();
  /**
   * Obtiene la configuración de los tuneles
   * @param user | Usuario
   */
  const getTunnelConfiguration = useCallback((user: string): void => {
    tunnelController
      .getConfiguration(user)
      .then((response: responseTunnelConfigRepo) => {
        if (response.isSuccess) {
          setTunnelConfiguration(response.getValue() as TunnelConfiguration);
        } else if (response.isFailure) {
          showMessage(
            getI18nText("tunneling.errorGetTunnels", {
              errorService: (
                response.getErrorValue() as ErrorGraphql
              ).getError().singleMessage,
            }),
            MessageType.error
          );
        }
      });
  }, []);

  /**
   * Obtiene los proveedores para tunneling
   */
  const getTunnelProviders = useCallback((): void => {
    tunnelController
      .getProviders()
      .then((response: responseTunnelProviderRepoArray) => {
        if (response.isSuccess) {
          setTunnelProviders(response.getValue() as TunnelProvider[]);
        } else if (response.isFailure) {
          showMessage(
            getI18nText("tunneling.errorGetProviders", {
              errorService: (
                response.getErrorValue() as ErrorGraphql
              ).getError().singleMessage,
            }),
            MessageType.error
          );
        }
      });
  }, []);

  return { getTunnelConfiguration, getTunnelProviders };
}
