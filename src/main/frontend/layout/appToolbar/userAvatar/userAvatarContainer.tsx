import { FC, useState } from "react";
import { Popover } from "@ui5/webcomponents-react";
import { Avatar } from "@ui5/webcomponents-react";
import { useSession } from "auth/authProvider";
import MenuProfile from "main/frontend/layout/appToolbar/userAvatar/menuProfile";

const UserAvatarContainer: FC = () => {

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
