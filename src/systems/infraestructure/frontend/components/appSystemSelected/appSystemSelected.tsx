import { FC } from "react";
import { Label, Text, FlexBox } from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";

export default function AppSystemSelected() {
  const { systemSelected } = useAppSelector((state) => state.System);
  const { getI18nText } = useTranslations();

  return (
    <>
      {systemSelected.name && (
        <FlexBox direction="Row" style={{ marginTop: "0.1rem" }}>
          <Label showColon={true} for="appSystemSelectedText">
            {getI18nText("appSystemSelected.label")}
          </Label>
          <Text id="appSystemSelectedText" style={{ marginLeft: "0.5rem" }}>
            {" "}
            {systemSelected.name}
          </Text>
        </FlexBox>
      )}
    </>
  );
}
