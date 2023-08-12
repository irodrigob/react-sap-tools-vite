import { Icon } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/locked";
import { OrderObjectTable } from "sap/transportOrder/infraestructure/types/transport";
import { useTranslations } from "translations/i18nContext";

export default function CellOrderLocked(instance: any) {
  const { getI18nText } = useTranslations();
  const rowOriginal: OrderObjectTable = instance.row.original;

  return (
    <>
      {rowOriginal.lockflag == "X" && (
        <Icon
          interactive={true}
          name="locked"
          showTooltip={true}
          accessibleName={getI18nText(
            "transportOrder.orderObjects.flatTableView.tooltipIconLocked"
          )}
        />
      )}
    </>
  );
}
