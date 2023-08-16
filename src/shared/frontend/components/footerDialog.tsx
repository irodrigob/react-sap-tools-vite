import { FC } from "react";
import {
  Button,
  Bar,
} from "@ui5/webcomponents-react";

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
