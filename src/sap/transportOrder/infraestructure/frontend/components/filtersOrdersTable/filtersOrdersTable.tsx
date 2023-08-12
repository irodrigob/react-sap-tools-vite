import { FC } from "react";
import {
  FilterBar,
  FilterGroupItem,
  MultiComboBox,
  MultiComboBoxItem,
  DatePicker,
  ValueState,
  Text,
  Ui5CustomEvent,
  MultiComboBoxDomRef,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/filter";
import { useTranslations } from "translations/i18nContext";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import useFilterValues from "./useFilterValues";
import {
  ToolbarFilters,
  FilterType,
} from "sap/transportOrder/infraestructure/types/transport";
import { STATUS } from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder";
import { useAppSelector } from "shared/storage/useStore";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import useTransportOrder from "sap/transportOrder/infraestructure/frontend/hooks/useTransportOrder";

const FiltersOrdersTable: FC = () => {
  const { getI18nText } = useTranslations();
  const { getDefaultFilters, checkFilterCombo, checkReleaseDate } =
    useFilterValues();
  const { toolbarFilters, toolbarFiltersState } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const sapTransportOrderActions = new SAPTransportOrderActions();
  const { showMessage } = useMessages();
  const { reloadUserOrders } = useTransportOrder();

  /*************************************
   * Funciones
   ************************************/
  /**
   * Evento que se dispara cuando cambian los valores de los filtros.
   * @param {object} e | Datos del evento de modificación
   */
  const onFilterChange = (
    e: Ui5CustomEvent<
      MultiComboBoxDomRef,
      {
        items: unknown[];
      }
    >
  ) => {
    let newFilterValues: ToolbarFilters = { ...toolbarFilters };

    let newValues = (
      newFilterValues[e.target.id as keyof ToolbarFilters] as FilterType[]
    ).map((row: FilterType) => {
      if (e.detail.items.find((item: any) => item.id == row.code))
        return { ...row, selected: true };
      else return { ...row, selected: false };
    });
    (newFilterValues[e.target.id as keyof ToolbarFilters] as FilterType[]) =
      newValues;

    sapTransportOrderActions.setToolbarFilters(newFilterValues);
    checkFilterCombo(
      newFilterValues[e.target.id as keyof ToolbarFilters] as FilterType[],
      e.target.id
    );
  };

  return (
    <FilterBar
      hideToolbar={true}
      style={{ marginBottom: "0.4rem" }}
      showGoOnFB
      showRestoreOnFB
      hideFilterConfiguration={false}
      onGo={(e) => {
        e.stopPropagation();
        if (
          toolbarFiltersState.orderStatus == ValueState.Error ||
          toolbarFiltersState.orderTypes == ValueState.Error ||
          toolbarFiltersState.releaseDate == ValueState.Error
        ) {
          showMessage(
            getI18nText("transportOrder.filters.validations.fixErrorFilters"),
            MessageType.error
          );
        } else {
          sapTransportOrderActions.setTextSearchOrders("");
          reloadUserOrders();
        }
      }}
      onRestore={() => {
        sapTransportOrderActions.setToolbarFilters(getDefaultFilters());
      }}
    >
      <FilterGroupItem
        active
        label={getI18nText("transportOrder.filters.type.labelOrder")}
        required
      >
        <MultiComboBox
          onSelectionChange={onFilterChange}
          id="orderTypes"
          valueState={toolbarFiltersState.orderTypes}
          valueStateMessage={<Text>{toolbarFiltersState.orderTypesDesc}</Text>}
        >
          {toolbarFilters.orderTypes.map((row: FilterType) => {
            return (
              <MultiComboBoxItem
                text={row.text}
                selected={row.selected}
                key={row.code}
                id={row.code}
              />
            );
          })}
        </MultiComboBox>
      </FilterGroupItem>
      <FilterGroupItem
        active
        label={getI18nText("transportOrder.filters.status.labelOrder")}
        required
      >
        <MultiComboBox
          onSelectionChange={onFilterChange}
          id="orderStatus"
          valueState={toolbarFiltersState.orderStatus}
          valueStateMessage={<Text>{toolbarFiltersState.orderStatusDesc}</Text>}
        >
          {toolbarFilters.orderStatus.map((row: FilterType) => {
            return (
              <MultiComboBoxItem
                text={row.text}
                selected={row.selected}
                key={row.code}
                id={row.code}
              />
            );
          })}
        </MultiComboBox>
      </FilterGroupItem>
      {toolbarFilters.orderStatus.find(
        (row: FilterType) => row.code == STATUS.RELEASED && row.selected == true
      ) && (
        <FilterGroupItem
          active
          label={getI18nText("transportOrder.filters.releaseDate.label")}
          required
        >
          <DatePicker
            hideWeekNumbers={true}
            formatPattern="dd.MM.yyyy"
            valueState={toolbarFiltersState.releaseDate}
            valueStateMessage={
              <Text>{toolbarFiltersState.releaseDateDesc}</Text>
            }
            onChange={(e) => {
              let newFilterValues = {
                ...toolbarFilters,
                releaseDateFrom: e.detail.value,
              };
              sapTransportOrderActions.setToolbarFilters(newFilterValues);

              checkReleaseDate(e.detail.value);
            }}
            value={toolbarFilters.releaseDateFrom as string}
          />
        </FilterGroupItem>
      )}
    </FilterBar>
  );
};

export default FiltersOrdersTable;
