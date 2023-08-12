import { FC } from "react";
import {
  Dialog,
  Button,
  Bar,
  Form,
  FormItem,
  CheckBox,
} from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";

interface Props {
  onEndButton: () => void;
  onStartButton?: () => void;
  disabledStartButton?: boolean;
  textStartButton?: string;
  textEndButton: string;
  slot?: string;
}

const FooterDialog: FC<Props> = (props) => {
  const {
    onStartButton,
    onEndButton,
    disabledStartButton,
    slot,
    textStartButton,
    textEndButton,
  } = props;
  const { getI18nText } = useTranslations();

  return (
    <Bar
      slot={slot}
      design="Footer"
      startContent={
        onStartButton ? (
          <Button
            style={{ marginTop: "0rem" }}
            onClick={onStartButton}
            disabled={disabledStartButton}
          >
            {textStartButton}
          </Button>
        ) : null
      }
      endContent={
        <Button style={{ marginTop: "0rem" }} onClick={onEndButton}>
          {textEndButton}
        </Button>
      }
      style={{
        marginTop: "0.3rem",
        marginBottom: "0.3rem",
      }}
    />
  );
};

export default FooterDialog;
