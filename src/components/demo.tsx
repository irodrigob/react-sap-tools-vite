import {
  Avatar,
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  Input,
  Link,
  LinkDesign,
  ShellBar,
} from "@ui5/webcomponents-react";

export default function Demo() {
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
        <Input placeholder="Hello World" />
      </FlexBox>
    </>
  );
}
