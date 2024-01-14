import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
	Dialog,
	Input,
	InputDomRef,
	Label,
	SuggestionItem,
	Text,
	Ui5CustomEvent,
	ValueState,
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
import {
	InputSuggestionItemPreviewEventDetail,
	InputSuggestionItemSelectEventDetail,
} from "@ui5/webcomponents/dist/Input.js";
import { useSession } from "auth/authProvider";
import ADTActions from "sap/adt/infraestructure/storage/adtActions";
import { ADTFavoritePackage } from "sap/adt/domain/entities/favoritePackage";

interface Props {
	open: boolean;
	onCloseButton: () => void;
	onConfirmButton: (addPackage: string) => void;
}

const PopupAddPackageContainer: FC<Props> = (props) => {
	const { open, onCloseButton, onConfirmButton } = props;
	const [packagesFound, setPackagesFound] = useState<ADTSearchObjects>([]);
	const [packagesState, setPackagesState] = useState<ValueState>(
		ValueState.None
	);
	const [packagesStateMessage, setPackagesStateMessage] = useState("");
	const { getI18nText } = useTranslations();
	const { showResultError, showMessage } = useMessages();
	const adtController = new SAPAdtController();
	const [packageValue, setPackageValue] = useState("");
	const [showLabel, setShowLabel] = useState(false);
	const { session } = useSession();
	const adtActions = new ADTActions();

	const searchPackages = useCallback(
		(event: Ui5CustomEvent<InputDomRef, never>) => {
			let values = event.target.value as string;
			if (values.length >= 2) {
				setShowLabel(true);
				adtController
					.quickSearch(ADT_OBJECT_TYPES.PACKAGES.OBJECT_TYPE, `${values}*`)
					.then((response: ResponseSearchObject) => {
						if (response.isSuccess) {
							let packagesFounded = response.getValue() as ADTSearchObjects;
							setPackagesFound(packagesFounded);
							if (packagesFounded.length == 0) {
								setPackagesState(ValueState.Error);
								setPackagesStateMessage(
									getI18nText(
										"adtIde.favoritePackages.popupAddPackage.packagesNotFound"
									)
								);
							} else {
								setPackagesState(ValueState.None);
								setPackagesStateMessage("");
							}
						} else {
							showResultError(response.getErrorValue() as ErrorGraphql);
						}
					});
			} else if (values.length == 0) {
				setShowLabel(false);
			}
		},
		[]
	);
	/**
	 * Gestiona el proceso de añadir el paquete tanto al modelo de datos como a la base de datos
	 */
	const handlerAddFavoritePackage = useCallback(() => {
		if (packagesState == ValueState.None) {
			adtController
				.AddFavoritePackage(session.email, packageValue)
				.then((response) => {
					if (response.isSuccess) {
						adtActions.addFavoritePackage(
							response.getValue() as ADTFavoritePackage
						);
						onConfirmButton(packageValue);
					} else {
						showResultError(response.getErrorValue() as ErrorGraphql);
					}
					setPackageValue("");
				});
			onConfirmButton(packageValue);
		}
	}, [packageValue]);
	return (
		<Dialog
			draggable
			open={open}
			style={{ width: "25%" }}
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
					onStartButton={() => {
						handlerAddFavoritePackage();
					}}
				/>
			}
		>
			{showLabel && (
				<Label showColon>
					{getI18nText("adtIde.favoritePackages.popupAddPackage.placeholder")}
				</Label>
			)}
			<Input
				style={{ width: "100%" }}
				showSuggestions={true}
				value={packageValue}
				valueState={packagesState}
				valueStateMessage={<Text>{packagesStateMessage}</Text>}
				placeholder={getI18nText(
					"adtIde.favoritePackages.popupAddPackage.placeholder"
				)}
				onSuggestionItemSelect={(
					event: Ui5CustomEvent<
						InputDomRef,
						InputSuggestionItemSelectEventDetail
					>
				) => {
					event.preventDefault();
					setPackageValue(event.detail.item.id as string);
				}}
				onSuggestionItemPreview={(
					event: Ui5CustomEvent<
						InputDomRef,
						InputSuggestionItemPreviewEventDetail
					>
				) => {
					event.preventDefault();
				}}
				onInput={(event: Ui5CustomEvent<InputDomRef, never>) => {
					event.preventDefault();
					searchPackages(event);
				}}
				onChange={(event: Ui5CustomEvent<InputDomRef, never>) => {
					event.preventDefault();
					setPackageValue(event.target.value as string);
				}}
			>
				{packagesFound.map((row) => {
					return (
						<SuggestionItem
							key={row.packageName}
							id={row.packageName}
							data-id={row.packageName}
							text={row.packageName}
						/>
					);
				})}
			</Input>
		</Dialog>
	);
};

export default PopupAddPackageContainer;
