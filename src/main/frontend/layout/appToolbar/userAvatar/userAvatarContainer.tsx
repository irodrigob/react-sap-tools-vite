import { FC, useRef, useState } from "react";
import { Popover } from "@ui5/webcomponents-react";
import { Avatar } from "@ui5/webcomponents-react";
import { useSession } from "auth/authProvider";
import MenuProfile from "main/frontend/layout/appToolbar/userAvatar/menuProfile";

interface Props {
  slot?: string;
}

const UserAvatarContainer: FC<Props> = (props) => {
  const { slot } = props
  const [openMenu, setOpenMenu] = useState(false);
  const { session } = useSession();
  return (
    <>
      <Avatar
        shape="Circle"
        size="XS"
        interactive={true}
        id="userAvatar"
        onClick={() => {
          setOpenMenu(true);
        }}
        slot={slot}
      >
        <img src={session.picture} referrerPolicy="no-referrer" />
      </Avatar>
      <Popover
        opener="userAvatar"
        open={openMenu}
        placementType="Bottom"
        onAfterClose={() => {
          setOpenMenu(false);
        }}
      >
        <MenuProfile />
      </Popover>
    </>
  );
};

export default UserAvatarContainer;
