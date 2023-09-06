import { FC, MouseEventHandler } from "react";
import { IconDropDownStyled } from "shared/frontend/components/iconDropDownStyled";
import "@ui5/webcomponents-icons/dist/slim-arrow-down";
import "@ui5/webcomponents-icons/dist/slim-arrow-up";

interface Props {
  openSystemList: boolean;
  slot?: string;
  onClick: MouseEventHandler<HTMLElement>;
}

const DropdownIcon: FC<Props> = (props) => {
  const { slot, openSystemList, onClick, ...others } = props;
  return (
    <IconDropDownStyled
      name={openSystemList ? "slim-arrow-up" : "slim-arrow-down"}
      slot={slot}
      onClick={onClick}
      {...others}
    />
  );
};

export default DropdownIcon;
