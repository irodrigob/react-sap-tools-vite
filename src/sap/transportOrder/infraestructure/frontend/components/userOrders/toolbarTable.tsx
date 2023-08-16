import { FC } from "react";
import {
  Toolbar,
  ToolbarSeparator,
  ToolbarSpacer,
  Button,
  Input,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/shipping-status";
import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents-icons/dist/refresh";
import "@ui5/webcomponents-icons/dist/duplicate";
import "@ui5/webcomponents-icons-tnt/dist/parts";
import PopupTransCopy from "sap/transportOrder/infraestructure/frontend/components/popupTransCopy/popupTransCopy";
import PopupNewOrder from "sap/transportOrder/infraestructure/frontend/components/popupNewOrder/popupNewOrder";
import { useTranslations } from "translations/i18nContext";
import useToolbarTable from "sap/transportOrder/infraestructure/frontend/hooks/useToolbarTable";
import ConfirmReleaseOrders from "./confirmReleaseOrders";

const ToolbarTable: FC = () => {
  const { getI18nText } = useTranslations();


  const {
    openConfirmeRelease,
    handlerTextSearch,
    handlerReleaseOrder,
    handlerRefresh,
    openPopupTransCopy,
    setOpenPopupTransCopy,
    handlerDoTransportCopy,
    handlerTransportCopy,
    handlerDoReleaseOrders,
    openPopupNewOrder,
    setOpenPopupNewOrder,
    handlerDoNewOrder,
    determineVisibleBtnObjects,
    handlerOrderObjects,
    textSearchOrders,
  } = useToolbarTable();

  /*

   style={{
            ...(orderTaskSelected.length == 0 && { display: "none" }),
          }}

  */
  return (
    <>
      <Toolbar toolbarStyle="Clear">
        <ToolbarSpacer />

        <Button
          icon="tnt/parts"
          tooltip={getI18nText(
            "transportOrder.tableOrder.actions.orderObjects"
          )}
          onClick={handlerOrderObjects}
          style={{
            ...(!determineVisibleBtnObjects && { display: "none" }),
          }}
        />
        <Button
          icon="duplicate"
          onClick={handlerTransportCopy}
          tooltip={getI18nText("transportOrder.toolbarAction.transportCopy")}

        />
        <Button
          icon="shipping-status"
          onClick={handlerReleaseOrder()}
          tooltip={getI18nText(
            "transportOrder.tableOrder.actions.releaseOrder"
          )}
        />
        <ToolbarSeparator />
        <Button
          icon="add"
          onClick={() => {
            setOpenPopupNewOrder(true);
          }}
          tooltip={getI18nText("transportOrder.toolbarAction.newOrder")}
        >
          {getI18nText("transportOrder.toolbarAction.newOrder")}
        </Button>

        <ToolbarSeparator />
        <Input
          placeholder={getI18nText(
            "transportOrder.toolbarAction.textSearchPlaceholder"
          )}
          onInput={handlerTextSearch()}
          value={textSearchOrders}
        />
        <Button
          icon="refresh"
          onClick={handlerRefresh()}
          tooltip={getI18nText("transportOrder.toolbarAction.refreshOrders")}
        />
      </Toolbar>
      <PopupNewOrder
        open={openPopupNewOrder}
        onCloseButton={() => {
          setOpenPopupNewOrder(false);
        }}
        onConfirmButton={handlerDoNewOrder}
      />
      <PopupTransCopy
        open={openPopupTransCopy}
        onCloseButton={() => {
          setOpenPopupTransCopy(false);
        }}
        onConfirmButton={handlerDoTransportCopy}
      />
      <ConfirmReleaseOrders
        open={openConfirmeRelease}
        onClose={handlerDoReleaseOrders}
      />
    </>
  );
};

export default ToolbarTable;
