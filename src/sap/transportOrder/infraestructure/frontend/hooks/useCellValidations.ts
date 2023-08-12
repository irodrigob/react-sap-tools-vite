import { useCallback } from "react";
import {
  ReturnGeneralValidations,
  ValueValidation,
  ReturnUserValidations,
} from "sap/transportOrder/infraestructure/types/transport";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";

export default function useCellValidations() {
  const { systemUsers } = useAppSelector((state) => state.SAPTransportOrder);
  const { getI18nText } = useTranslations();
  /**
   * Validación general de datos que se editan
   * @param value | Valor
   * @returns
   */
  const generalDataValidation = useCallback(
    (value: ValueValidation): ReturnGeneralValidations => {
      if (typeof value == "number") {
      } else if (typeof value == "string") {
        if (value.length == 0) {
          return {
            error: true,
            message: getI18nText(
              "transportOrder.changeOrder.validations.fieldMandatory"
            ),
          };
        }
      }
      return { error: false, message: "" };
    },
    []
  );

  /**
   * Validación del usuario y retonar el id del usuario
   * @param user | Usuario
   */
  const userValidation = useCallback(
    (user: string): ReturnUserValidations => {
      let resultValidation = generalDataValidation(user);
      if (resultValidation.error) {
        return resultValidation;
      } else {
        // El dato que puede venir es el descriptivo o el código. El descriptivo suele venir cuando
        // se introduce a mano y el codigo cuando se hace desde el desplegable.
        let index = systemUsers.findIndex((row) => row.user == user);
        if (index == -1)
          index = systemUsers.findIndex((row) => row.userDesc == user);

        if (index == -1)
          return {
            error: true,
            message: getI18nText(
              "transportOrder.changeOrder.validations.userNotExist"
            ),
          };
        else
          return {
            error: false,
            message: "",
            user: systemUsers[index].user as string,
          };
      }
    },
    [systemUsers]
  );

  return { generalDataValidation, userValidation };
}
