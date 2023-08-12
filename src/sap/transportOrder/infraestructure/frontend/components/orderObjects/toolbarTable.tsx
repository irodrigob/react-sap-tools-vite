import { FC, useEffect } from "react";
import {
  Toolbar,
  ToolbarSeparator,
  ToolbarSpacer,
  Button,
  Input,
  Title,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/delete";
import "@ui5/webcomponents-icons/dist/hide";
import "@ui5/webcomponents-icons/dist/forward";
import { useTranslations } from "translations/i18nContext";
import { OrderObjectsKey } from "sap/transportOrder/infraestructure/types/transport";
import { useAppSelector } from "shared/storage/useStore";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import useToolbarOrderObjects from "sap/transportOrder/infraestructure/frontend/hooks/useToolbarOrderObjects";

interface Props {
  textSearch: string;
  setTextSearch: (text: string) => void;
  reloadObjectOrders: () => void;
  objectsSelected: OrderObjectsKey;
  setObjectsSelected: (value: OrderObjectsKey) => void;
  setOpenMoveObjects: (value: boolean) => void;
  setOpenDeleteObjects: (value: boolean) => void;
}

const ToolbarTable: FC<Props> = (props) => {
  const {
    setTextSearch,
    textSearch,
    reloadObjectOrders,
    objectsSelected,
    setObjectsSelected,
    setOpenMoveObjects,
    setOpenDeleteObjects,
  } = props;
  const { getI18nText, language } = useTranslations();
  const { ordersObjectsSelected } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const sapTransportOrderActions = new SAPTransportOrderActions();
  const { handlerToolbarMove, handlerToolbarDelete } = useToolbarOrderObjects(
    setOpenMoveObjects,
    setOpenDeleteObjects
  );

  return (
    <Toolbar toolbarStyle="Clear">
      <Button
        icon="hide"
        tooltip={getI18nText(
          "transportOrder.orderObjects.actions.deleteObject"
        )}
        onClick={() => {
          // Limpio los objetos seleccionados para que inicializar para la siguiente vez que se quiera ver
          // los objetos. Así me aseguro que los componentes se refrescarán correctamente ya que el estado
          // ha cambiado
          setObjectsSelected([]);
          sapTransportOrderActions.setShowOrderObjects(false);
        }}
      />
      {ordersObjectsSelected.length == 1 && (
        <Title>
          {ordersObjectsSelected[0].order} -{" "}
          {ordersObjectsSelected[0].description}
        </Title>
      )}

      <ToolbarSpacer />

      <Button
        icon="forward"
        tooltip={getI18nText("transportOrder.orderObjects.actions.moveObject")}
        onClick={handlerToolbarMove(objectsSelected)}
      />

      <Button
        icon="delete"
        design="Negative"
        tooltip={getI18nText(
          "transportOrder.orderObjects.actions.deleteObject"
        )}
        onClick={handlerToolbarDelete(objectsSelected)}
      />
      <ToolbarSeparator />
      <Input
        placeholder={getI18nText(
          "transportOrder.orderObjects.toolbarAction.placeholderSearch"
        )}
        onInput={(event) => {
          event.preventDefault();
          let value = event.target.value as string;
          if (value.length > 2 || value.length == 0) {
            setTextSearch(value);
          }
        }}
        value={textSearch}
      />
      <Button
        icon="refresh"
        tooltip={getI18nText(
          "transportOrder.orderObjects.toolbarAction.refresh"
        )}
        onClick={() => {
          setTextSearch("");
          reloadObjectOrders();
        }}
      />
    </Toolbar>
  );
};

export default ToolbarTable;
