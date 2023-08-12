import { FC, useState } from "react";
import "@ui5/webcomponents-icons/dist/account";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import { Input, Ui5CustomEvent, InputDomRef } from "@ui5/webcomponents-react";
import DropdownIcon from "shared/frontend/components/dropdownIcon";
import { useSession } from "auth/authProvider";
import SuggestionSystemList from "systems/infraestructure/frontend/components/systemSelect/suggestionSystemList";
import { useTranslations } from "translations/i18nContext";
import SystemController from "systems/infraestructure/controller/systemController";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import useSystems from "systems/infraestructure/frontend/hooks/useSystems";
import ComboSystemList from "systems/infraestructure/frontend/components/systemSelect/comboSystemList";
import DialogEditSystem from "systems/infraestructure/frontend/components/dialogEditSystem/dialogEditSystemContainer";
import DialogSystemListContainer from "systems/infraestructure/frontend/components/dialogSystemList/dialogSystemListContainer";

import { useAppSelector } from "shared/storage/useStore";

interface Props {
  //children: React.ReactNode;
}

const SystemSelectContainer: FC<Props> = () => {
  const { session } = useSession();
  const { getI18nText } = useTranslations();
  const { systemsList } = useSystemData();
  const [openComboSystemList, setOpenComboSystemList] = useState(false);
  const [loadingSystems, setLoadingSystems] = useState(true);
  const { processSelectedSystem } = useSystems();
  const [openAddSystem, setOpenAddSystem] = useState(false);
  const [openDialogSystemList, setOpenDialogSystemList] = useState(false);
  const systemController = new SystemController();
  const systemSelected = useAppSelector((state) => state.System.systemSelected);

  /*************************************
   * Funciones
   ************************************/

  /*************************************
   * Efectos
   ************************************/

  return (
    <>
      <Input
        id="inputSystemSelect"
        icon={
          <DropdownIcon
            openSystemList={openComboSystemList}
            onClick={() => {
              setOpenComboSystemList(!openComboSystemList);
            }}
          />
        }
        showSuggestions={true}
        placeholder={
          loadingSystems
            ? getI18nText("systemSelect.loadingSystemData")
            : getI18nText("systemSelect.placeholder")
        }
        value={systemSelected.name}
        onChange={(e: Ui5CustomEvent<InputDomRef, never>) => {
          let row = systemsList.find(
            (row) => row.name == e.target.getAttribute("value")
          );
          if (row) {
            processSelectedSystem(row);
            setOpenComboSystemList(!openComboSystemList);
          }
        }}
      >
        {" "}
        {Array.isArray(systemsList) && systemsList.length > 0 && (
          <SuggestionSystemList systemsList={systemsList} />
        )}
      </Input>
      <ComboSystemList
        opener="inputSystemSelect"
        open={openComboSystemList}
        onAfterClose={() => {
          setOpenComboSystemList(false);
        }}
        systemsList={systemsList}
        handlerSystemSelected={(systemSelected: string) => {
          let row = systemsList.find((row) => row._id == systemSelected);
          if (row) {
            processSelectedSystem(row);
            setOpenComboSystemList(!openComboSystemList);
          }
        }}
        handlerOpenAddSystem={() => {
          setOpenAddSystem(true);
        }}
        handlerOpenSystemList={() => {
          setOpenDialogSystemList(true);
        }}
      />
      <DialogEditSystem />
      <DialogSystemListContainer
        open={openDialogSystemList}
        onCloseButton={() => {
          setOpenDialogSystemList(false);
        }}
      />
    </>
  );
};

export default SystemSelectContainer;
