import { FC, useState } from "react";
import { Icon } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/settings";
import ConfigurationOptions from "./configurationOptions";

const SystemConfigurationContainer: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Icon
        name="settings"
        interactive={true}
        id="systemConfiguration"
        style={{
          marginTop: "0.5rem",
          width: "1.2rem",
          height: "1.2rem",
          color: "var(--sapButton_Lite_TextColor)",
        }}
        onClick={() => {
          setOpen(true);
        }}
      />

      <ConfigurationOptions
        open={open}
        onCloseButton={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default SystemConfigurationContainer;
