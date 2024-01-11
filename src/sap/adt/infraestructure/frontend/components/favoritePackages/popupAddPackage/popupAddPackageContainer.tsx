import { FC, useCallback, useState } from "react";
import {
	Dialog,
	Input,
	InputDomRef,
	SuggestionItem,
	Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import FooterDialog from "shared/frontend/components/footerDialog";
import { useTranslations } from "translations/i18nContext";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import { ADTSearchObjects } from "sap/adt/domain/entities/searchObject";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import useMessages from "shared/infraestructure/hooks/useMessages";
import { ResponseSearchObject } from "sap/adt/infraestructure/types/adt";

interface Props {
	open: boolean;
	onCloseButton: () => void;
	onConfirmButton: () => void;
}

const PopupAddPackageContainer: FC<Props> = (props) => {
	const { open, onCloseButton, onConfirmButton } = props;
	const [packagesFound, setPackagesFound] = useState<ADTSearchObjects>([]);
	const { getI18nText } = useTranslations();
	const { showResultError, showMessage } = useMessages();
	const adtController = new SAPAdtController();

	const searchPackages = useCallback(
		(event: Ui5CustomEvent<InputDomRef, never>) => {
			let values = event.target.value as string;
			if (values.length >= 3) {
				adtController
					.quickSearch(ADT_OBJECT_TYPES.PACKAGES.OBJECT_TYPE, `${values}*`)
					.then((response: ResponseSearchObject) => {
						if (response.isSuccess) {
							let packagesFounded = response.getValue() as ADTSearchObjects;
							setPackagesFound(packagesFounded);
							if (packagesFounded.length == 0)
								showMessage(
									getI18nText(
										"adtIde.favoritePackages.popupAddPackage.packagesNotFound"
									)
								);
						} else {
							showResultError(response.getErrorValue() as ErrorGraphql);
						}
					});
			}
		},
		[]
	);
	const packageSelected = useCallback(
		(event: Ui5CustomEvent<InputDomRef, never>) => {
			let values = event.target.value as string;
			console.log(values);
		},
		[]
	);

	return (
		<Dialog
			open={open}
			headerText={getI18nText("adtIde.favoritePackages.popupAddPackage.title")}
			footer={
				<FooterDialog
					textStartButton={getI18nText(
						"adtIde.favoritePackages.popupAddPackage.btnConfirm"
					)}
					textEndButton={getI18nText("general.btnTxtCancel")}
					onEndButton={() => {
						onCloseButton();
					}}
					onStartButton={() => onConfirmButton()}
				/>
			}
		>
			<Input
				icon={null}
				onInput={(event: Ui5CustomEvent<InputDomRef, never>) => {
					event.preventDefault();
					searchPackages(event);
				}}
				onChange={() => {}}
				placeholder={getI18nText(
					"adtIde.favoritePackages.popupAddPackage.placeholder"
				)}
				showSuggestions
			>
				{packagesFound.map((row) => {
					return (
						<SuggestionItem
							key={row.packageName}
							text={row.packageName}
						/>
					);
				})}
			</Input>
		</Dialog>
	);
};

export default PopupAddPackageContainer;
