import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ValueState } from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import date from "date-and-time";
import {
  STATUS,
  TYPE,
} from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder";
import {
  FilterType,
  ToolbarFilters,
  ToolbarFiltersState,
  FiltersOrdersGraphQL,
} from "sap/transportOrder/infraestructure/types/transport";
import { useAppSelector } from "shared/storage/useStore";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import DateUtils from "shared/utils/date/date";

export default function useFilterValues() {
  const dispatch = useDispatch();

  const { toolbarFiltersState, toolbarFilters } = useAppSelector(
    (state) => state.SAPTransportOrder
  );
  const { getI18nText } = useTranslations();
  const sapTransportOrderActions = new SAPTransportOrderActions();
  const dateUtils = new DateUtils()

  /**
   * Devuelve los valores
   * @param filtersValues | Valores de los filtros
   * @returns | Filtros por defecto para la barra de filtros de la tabla de ordenes
   */
  const getDefaultFilters = useCallback(() => {
    // Tipos
    let types: FilterType[] = [
      {
        code: TYPE.WORKBENCH,
        text: getI18nText("transportOrder.orderTypes.workbench"),
        selected: true,
      },
      {
        code: TYPE.CUSTOMIZING,
        text: getI18nText("transportOrder.orderTypes.customizing"),
        selected: true,
      },
      {
        code: TYPE.TRANSPORT_COPIES,
        text: getI18nText("transportOrder.orderTypes.transportCopies"),
        selected: false,
      },
    ];

    // Status
    let status: FilterType[] = [
      {
        code: STATUS.CHANGEABLE,
        text: getI18nText("transportOrder.filters.status.values.changeable"),
        selected: true,
      },
      {
        code: STATUS.RELEASED,
        text: getI18nText("transportOrder.filters.status.values.released"),
        selected: false,
      },
    ];

    // Fecha de liberación
    let previousDate: string = date.format(
      dateUtils.addMonths(new Date(), -1),
      "DD.MM.YYYY"
    );

    return {
      orderTypes: types,
      orderStatus: status,
      releaseDateFrom: previousDate,
    };
  }, []);
  /**
   * Convierte los filtros al formato de los servicios de graphql
   * @param filtersValues | Valores de los filtros
   * @returns | Objeto compatible con graphql
   */

  const convertFilter2paramsGraphql = useCallback(
    (filtersValues: ToolbarFilters): FiltersOrdersGraphQL => {
      return {
        orderTypes: filtersValues.orderTypes
          .filter((row: FilterType) => row.selected)
          .map((values: FilterType) => {
            return { type: values.code };
          }),
        orderStatus: filtersValues.orderStatus
          .filter((row: FilterType) => row.selected)
          .map((values: FilterType) => {
            return { status: values.code };
          }),

        releaseDateFrom:
          filtersValues.releaseDateFrom != ""
            ? [
              date.transform(
                filtersValues.releaseDateFrom as string,
                "DD.MM.YYYY",
                "YYYY-MM-DD"
              ),
              "00:00:00",
            ].join("T")
            : null,
      };
    },
    []
  );

  /**
   * Chequeo los valores de los multicombo
   * @param {Array} comboValues
   * @param {string} comboId
   */
  const checkFilterCombo = useCallback(
    (comboValues: FilterType[], comboId: any) => {
      let newFiltersValueState: ToolbarFiltersState = {
        ...toolbarFiltersState,
      };
      let fieldDesc: string = comboId + "Desc";
      if (comboValues.findIndex((row: FilterType) => row.selected) != -1) {
        newFiltersValueState[comboId as keyof ToolbarFiltersState] =
          ValueState.None;
        (newFiltersValueState[
          fieldDesc as keyof ToolbarFiltersState
        ] as string) = "";
      } else {
        newFiltersValueState[comboId as keyof ToolbarFiltersState] =
          ValueState.Error;
        (newFiltersValueState[
          fieldDesc as keyof ToolbarFiltersState
        ] as string) = getI18nText(
          "transportOrder.filters.validations.fieldMandatory"
        );
      }

      sapTransportOrderActions.setToolbarFiltersState(newFiltersValueState);
    },
    []
  );

  /**
   * Verifica la fecha de liberación
   * @param {string} value
   */
  const checkReleaseDate = useCallback(
    (value: string) => {
      if (
        toolbarFilters.orderStatus.find(
          (row) => row.code == STATUS.RELEASED && row.selected == true
        )
      ) {
        let newFiltersValueState: ToolbarFiltersState = {
          ...toolbarFiltersState,
        };

        if (value.length == 0) {
          newFiltersValueState.releaseDate = ValueState.Error;
          newFiltersValueState.releaseDateDesc = getI18nText(
            "transportOrder.filters.validations.fieldMandatory"
          );
        } else {
          newFiltersValueState.releaseDate = ValueState.None;
          newFiltersValueState.releaseDateDesc = "";
        }
        sapTransportOrderActions.setToolbarFiltersState(newFiltersValueState);
      }
    },
    [toolbarFilters]
  );

  return {
    getDefaultFilters,
    convertFilter2paramsGraphql,
    checkFilterCombo,
    checkReleaseDate,
  };
}
