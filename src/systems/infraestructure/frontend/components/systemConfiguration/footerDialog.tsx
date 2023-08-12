import { FC } from "react";
import { Button, Bar } from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";

interface Props {
  onCloseButton: () => void;
  slot?: string;
}

const FooterDialog: FC<Props> = (props) => {
  const { onCloseButton, slot } = props;
  const { getI18nText } = useTranslations();

  return (
    <Bar
      slot={slot}
      design="Footer"
      endContent={
        <Button style={{ marginTop: "1rem" }} onClick={onCloseButton}>
          {getI18nText("systemConfiguration.btnClose")}
        </Button>
      }
      style={{
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    />
  );
};

export default FooterDialog;
