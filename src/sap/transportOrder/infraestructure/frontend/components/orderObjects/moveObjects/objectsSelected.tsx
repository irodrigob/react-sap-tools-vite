import { useEffect, useMemo, useState, FC } from "react";
import {
  AnalyticalTable,
  FlexBox,
  Title,
} from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";

import { OrderObjectsKey } from "sap/transportOrder/infraestructure/types/transport";

interface Props {
  objectsSelected: OrderObjectsKey;
}

const ObjectsSelected: FC<Props> = (props: Props) => {
  const { objectsSelected } = props;
  const { getI18nText } = useTranslations();
  /*const { objectsToProcess } = useAppSelector(
    (state) => state.SAPTransportOrder
  );*/
  const [visibleRows, setVisibleRows] = useState(0);

  useEffect(() => {
    if (objectsSelected.length <= 5) setVisibleRows(objectsSelected.length);
    else setVisibleRows(5);
  }, [objectsSelected]);

  const columnsTable = useMemo(
    () => [
      {
        Header: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblPgmid"
        ),
        headerTooltip: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblPgmid"
        ),
        accessor: "pgmid",
        maxWidth: 100,
      },
      {
        Header: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblObject"
        ),
        headerTooltip: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblObject"
        ),
        accessor: "object",
        maxWidth: 80,
      },
      {
        Header: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblObjName"
        ),
        headerTooltip: getI18nText(
          "transportOrder.orderObjects.flatTableView.lblObjName"
        ),
        accessor: "objName",
        width: 450,
      },
    ],
    []
  );

  return (
    <FlexBox direction="Column" style={{ paddingBottom: "2rem" }}>
      <Title level="H4" style={{ paddingBottom: "1rem" }}>
        {getI18nText(
          "transportOrder.orderObjects.moveObjects.panelObjectsSelected"
        )}
      </Title>

      <AnalyticalTable
        style={{ marginLeft: "1rem" }}
        columns={columnsTable}
        data={objectsSelected}
        visibleRows={visibleRows}
        noDataText={getI18nText("transportOrder.orderObjects.noDataText")}
      />
    </FlexBox>
  );
};

export default ObjectsSelected;
