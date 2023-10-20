import { FC } from "react";
import {
    Dialog,
    FileUploader,
    Icon,
    Text,
    FlexBox,
    FlexBoxAlignItems,
    Avatar,
    FlexBoxDirection,
    Ui5CustomEvent,
    FileUploaderDomRef,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/download";
import "@ui5/webcomponents-icons/dist/upload";
import FooterDialog from "shared/frontend/components/footerDialog";
import { useTranslations } from "translations/i18nContext";
import { FileUploaderChangeEventDetail } from "@ui5/webcomponents/dist/FileUploader.js";

interface Props {
    open: boolean;
    onCloseButton: () => void;
    onConfirmButton: (event: any) => void;
    onDownloadTemplate: () => void;
}

const PopupUploadTemplate: FC<Props> = (props: Props) => {
    const { open, onCloseButton, onConfirmButton, onDownloadTemplate } = props;
    const { getI18nText } = useTranslations();

    const handlerUpload = () => { };

    return (
        <Dialog
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
            <FlexBox
                alignItems={FlexBoxAlignItems.Center}
                direction={FlexBoxDirection.Column}
            >
                <Text wrapping={true}>
                    {getI18nText("translate.popupUploadTemplate.advice1")}{" "}
                    <Icon
                        name="download"
                        style={{
                            width: "3rem",
                            height: "1.5rem",
                        }}
                        interactive={true}
                        onClick={onDownloadTemplate}
                    />{" "}
                    {getI18nText("translate.popupUploadTemplate.advice2")}{" "}
                    {getI18nText("translate.popupUploadTemplate.advice3")}
                </Text>
                <FileUploader hideInput onChange={(event: Ui5CustomEvent<FileUploaderDomRef, FileUploaderChangeEventDetail>) => {
                    if (event.detail?.files) {
                        let fichero = event.detail.files[0]
                        console.log(fichero.stream())
                    }

                }}>
                    <Avatar
                        icon="upload"
                        style={{ marginTop: "2rem" }}
                    />
                </FileUploader>
            </FlexBox>
        </Dialog>
    );
};

export default PopupUploadTemplate;
