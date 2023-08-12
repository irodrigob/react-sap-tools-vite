import { useState, useEffect, FC } from "react";
import { Link, List, StandardListItem, Icon, Avatar } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/sys-help";
import { Popover } from "@ui5/webcomponents-react";
//import AppsList from "sap/general/domain/entities/appsList";
//import { useAppSelector } from "shared/storage/useStore";
const generalHelp = {
  appDesc: "General",
  urlHelp: "https://github.com/irodrigob/react-sap-tools",
};

const GeneralHelp: FC = () => {
  const [open, setOpen] = useState(false);
  const [listHelps, setListHelps] = useState([generalHelp]);
  //const { appsList } = useAppSelector((state) => state.SAPGeneral);

  /*
      <Icon
        name="sys-help"
        interactive={true}
        id="generalHelp"
        style={{
          width: "2rem",
          height: "2rem",
          paddingTop: "0.2rem",
          color: "var(--sapContent_Illustrative_Color2)",
        }}
        onClick={() => {
          setOpen(true);
        }}
      />
  */
  return (
    <>
      <Avatar
        accessibleName="general help"
        size="XS"
        interactive={true}
        id="generalHelp"
        onClick={() => {
          setOpen(true);
        }}
        icon="sys-help"
        style={{ backgroundColor: "transparent" }}
      />
      <Popover
        opener="generalHelp"
        open={open}
        placementType="Bottom"
        onAfterClose={() => {
          setOpen(false);
        }}
      >
        <List>
          {listHelps.map((row, index) => {
            return (
              <StandardListItem key={`K${index}`}>
                <Link
                  onClick={() => {
                    window.open(row.urlHelp, "_blank", "noopener,noreferrer");
                  }}
                  key={`L${index}`}
                >
                  {row.appDesc}
                </Link>
              </StandardListItem>
            );
          })}
        </List>
      </Popover>
    </>
  );
};

export default GeneralHelp;