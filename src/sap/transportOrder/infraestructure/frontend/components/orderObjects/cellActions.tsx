import { FC } from "react";
import { FlexBox, Icon, ToolbarSeparatorV2 } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/edit";
import "@ui5/webcomponents-icons/dist/delete";
import "@ui5/webcomponents-icons/dist/copy";
import "@ui5/webcomponents-icons/dist/forward";
import { useTranslations } from "translations/i18nContext";
import { OrderObjectTable } from "sap/transportOrder/infraestructure/types/transport";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";

const CellActions: FC = (instance: any) => {
  const { getI18nText } = useTranslations();
  const rowOriginal: OrderObjectTable = instance.row.original;
  const sapTransportOrderActions = new SAPTransportOrderActions();

  return (
    <>
      <FlexBox justifyContent="SpaceAround" style={{ paddingLeft: "-4rem" }}>
        {!rowOriginal.row_editable && (
          <Icon
            name="copy"
            interactive={true}
            style={{ marginRight: "0.5rem" }}
            showTooltip={true}
            onClick={() => { }}
            accessibleName={getI18nText(
              "transportOrder.orderObjects.actions.copyObject"
            )}
          />
        )}
        {rowOriginal.row_editable && (
          <>
            <Icon
              name="forward"
              interactive={true}
              style={{ marginRight: "0.1rem" }}
              showTooltip={true}
              onClick={() => {
                /*
                sapTransportOrderActions.setOpenMoveObjects(true);
                sapTransportOrderActions.setObjectsToProcess([
                  {
                    order: rowOriginal.order,
                    object: rowOriginal.object,
                    objName: rowOriginal.objName,
                    pgmid: rowOriginal.pgmid,
                  },
                ]);*/
              }}
              accessibleName={getI18nText(
                "transportOrder.orderObjects.actions.moveObject"
              )}
            />
            <ToolbarSeparatorV2
              style={{ height: "1rem", marginLeft: "0.3rem" }}
            />
            <Icon
              name="delete"
              interactive={true}
              design="Negative"
              style={{ marginLeft: "0.3rem" }}
              showTooltip={true}
              onClick={() => {
                sapTransportOrderActions.setOpenConfirmDeleteOrderObject(true);
                sapTransportOrderActions.setObjectsToProcess([
                  {
                    order: rowOriginal.order,
                    object: rowOriginal.object,
                    objName: rowOriginal.objName,
                    pgmid: rowOriginal.pgmid,
                  },
                ]);
              }}
              accessibleName={getI18nText(
                "transportOrder.orderObjects.actions.deleteObject"
              )}
            />
          </>
        )}
      </FlexBox>
    </>
  );
};

export default CellActions;
