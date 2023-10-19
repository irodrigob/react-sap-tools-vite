import { FC } from "react";
import { Dialog, Title, Icon, Text } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/download";
import FooterDialog from "shared/frontend/components/footerDialog";
import { useTranslations } from "translations/i18nContext";

interface Props {
    open: boolean;
    onCloseButton: () => void;
    onConfirmButton: (event: any) => void;
}

const PopupUploadTemplate: FC<Props> = (props: Props) => {
    const { open, onCloseButton, onConfirmButton } = props;
    const { getI18nText } = useTranslations();

    const handlerUpload = () => { }

    return (<Dialog
        open={open}
        headerText={getI18nText("translate.popupUploadTemplate.title")}
        footer={
            <FooterDialog
                textEndButton={getI18nText("general.btnTxtCancel")}
                onEndButton={() => {
                    onCloseButton();
                }}

            />
        }
    >
        <Text>{getI18nText("translate.popupUploadTemplate.advice1")} <Icon name="download" /></Text><br></br>
        <Text>{getI18nText("translate.popupUploadTemplate.advice2")}</Text>

    </Dialog>)
}

export default PopupUploadTemplate