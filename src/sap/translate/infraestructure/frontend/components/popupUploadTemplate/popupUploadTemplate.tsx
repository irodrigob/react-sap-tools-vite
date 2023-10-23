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
import { FileUploaderChangeEventDetail } from "@ui5/webcomponents/dist/FileUploader.js";
import FooterDialog from "shared/frontend/components/footerDialog";
import { useTranslations } from "translations/i18nContext";
import StreamUtils from "shared/utils/file/streamUtils";

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
                        new StreamUtils(event.detail.files[0].stream()).getStream()

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
