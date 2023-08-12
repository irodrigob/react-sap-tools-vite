import { FC, useState } from "react";
import { TabContainer, Tab, Dialog } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/menu";
import TunnelConfigurationForm from "tunnelSystem/infraestructure/frontend/components/popTunnelConfiguration/tunnelConfigurationForm";
import FooterDialog from "./footerDialog";
import { useTranslations } from "translations/i18nContext";

interface Props {
  open: boolean;
  onCloseButton: () => void;
}

const ConfigurationOptions: FC<Props> = (props) => {
  const { open, onCloseButton } = props;
  const [openPopupTunnel, setOpenPopupTunnel] = useState(false);
  const { getI18nText } = useTranslations();

  return (
    <Dialog
      open={open}
      headerText={getI18nText("systemConfiguration.title")}
      footer={<FooterDialog onCloseButton={onCloseButton} />}
      style={{ width: "50rem" }}
    >
      <TabContainer data-ui5-compact-size>
        <Tab
          icon="menu"
          selected
          text={getI18nText("systemConfiguration.tunnelConfigurationTab")}
        >
          <TunnelConfigurationForm />
        </Tab>
      </TabContainer>
    </Dialog>
  );
};

export default ConfigurationOptions;
