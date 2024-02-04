import { FC, useCallback } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "@/translations/i18nContext";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import useMessages from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import useAdtStore from "sap/adt/infraestructure/frontend/hooks/useAdtStore";

interface Props {
	openDialog: boolean;
	onOpenChange: (value: boolean) => void;
	packageName: string;
}
const PopupDeleteFavoritePackage: FC<Props> = ({
	openDialog,
	onOpenChange,
	packageName,
}) => {
	const { getI18nText } = useTranslations();
	const sapAdtController = new SAPAdtController();
	const { showResultError, showMessage } = useMessages();
	const { deleteFavoritePackageAction } = useAdtStore();
	const handlerDelete = useCallback(() => {
		sapAdtController.deleteFavoritePackage(packageName).then((response) => {
			if (response.isSuccess) {
				deleteFavoritePackageAction(packageName);
				showMessage(
					getI18nText(
						"adtIde.favoritePackages.popupDeletePackage.packageDeleted",
						{ packageName: packageName }
					)
				);
			} else {
				showResultError(response.getErrorValue() as ErrorGraphql);
			}
		});
	}, []);

	return (
		<AlertDialog
			open={openDialog}
			onOpenChange={onOpenChange}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{getI18nText("adtIde.favoritePackages.popupDeletePackage.title")}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{getI18nText(
							"adtIde.favoritePackages.popupDeletePackage.description",
							{ packageName: packageName }
						)}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>
						{getI18nText("adtIde.favoritePackages.popupDeletePackage.cancel")}
					</AlertDialogCancel>
					<AlertDialogAction onClick={handlerDelete}>
						{getI18nText("adtIde.favoritePackages.popupDeletePackage.confirm")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default PopupDeleteFavoritePackage;
