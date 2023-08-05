import {
  Avatar,
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  Input,
  InputPropTypes,
  Label,
  Link,
  LinkDesign,
  ShellBar,
} from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";
import { useTranslations } from "./translations/i18nContext";

function App() {
  const [inputVal, setInputVal] = useState("");
  const handleInput: InputPropTypes["onInput"] = (e) => {
    setInputVal(e.target.value ?? "");
  };
  const { getI18nText } = useTranslations();

  useEffect(() => {
    document.title = getI18nText("app.title");
  }, []);

  return (
    <>
      <ShellBar
        logo={<img src="/vite.svg" alt={"Vite Logo"} />}
        primaryTitle="UI5 Web Components for React Template"
        profile={<Avatar initials={"UI5"} />}
      />
      <FlexBox
        direction={FlexBoxDirection.Column}
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Center}
      >
        <Link
          href="https://sap.github.io/ui5-webcomponents-react/"
          target="_blank"
          design={LinkDesign.Emphasized}
        >
          Getting Started with UI5 Web Component for React
        </Link>
        <Input
          placeholder="Hello World"
          onInput={handleInput}
          value={inputVal}
        />
        <Label>{inputVal}</Label>
      </FlexBox>
    </>
  );
}

export default App;
