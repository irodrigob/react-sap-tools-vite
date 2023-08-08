import {
  Avatar,
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  LinkDesign,
  ShellBar,
} from "@ui5/webcomponents-react";
import { useSession } from "auth/authProvider";

export default function AppToolbarContainer() {
  const { session } = useSession();

  return <>{session && <p>toolbar</p>}</>;
}
