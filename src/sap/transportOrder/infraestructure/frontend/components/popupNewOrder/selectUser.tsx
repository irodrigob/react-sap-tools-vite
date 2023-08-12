import { FC, useEffect } from "react";
import { ComboBox, ComboBoxItem } from "@ui5/webcomponents-react";

import { useAppSelector } from "shared/storage/useStore";

interface Props {
  onChange: (data: any) => void;
  value: string;
}
const SelectUser: FC<Props> = (props: Props) => {
  const { onChange, value } = props;
  const { systemUsers } = useAppSelector((state) => state.SAPTransportOrder);

  return (
    <ComboBox
      value={value}
      onChange={(event) => {
        event.preventDefault();
        onChange(event.target.value as string);
      }}
    >
      {systemUsers.map((row) => {
        return (
          <ComboBoxItem
            text={row.user}
            additionalText={row.userDesc}
            key={row.user}
            id={row.user}
            data-key={row.user}
            data-id={row.user}
          />
        );
      })}
    </ComboBox>
  );
};

export default SelectUser;
