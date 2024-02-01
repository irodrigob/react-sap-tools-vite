import {
	FC,
	FormEvent,
	FormEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	InputDomRef,
	SuggestionItem,
	Text,
	Ui5CustomEvent,
	ValueState,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { ADTFavoritePackage } from "sap/adt/domain/entities/favoritePackage";
import { useAppSelector } from "shared/storage/useStore";
import useSAPGeneral from "sap/general/infraestructure/frontend/hooks/useSAPGeneral";
import { Button } from "@/components/ui/button";
import useAdtStore from "sap/adt/infraestructure/frontend/hooks/useAdtStore";

interface Props {
	open: boolean;
	onOpenChange: (value: boolean) => void;
	onCloseButton: () => void;
	onConfirmButton: (addPackage: string) => void;
}

const PopupAddPackageContainer: FC<Props> = (props) => {
	const { open, onCloseButton, onConfirmButton, onOpenChange } = props;
	const [packagesFound, setPackagesFound] = useState<ADTSearchObjects>([]);
	const [packagesStateError, setPackagesStateError] = useState(false);
	const [packagesStateMessage, setPackagesStateMessage] = useState("");
	const { getI18nText } = useTranslations();
	const { showResultError, showMessage } = useMessages();
	const adtController = new SAPAdtController();
	const [packageValue, setPackageValue] = useState("");
	const [showLabel, setShowLabel] = useState(false);
	const { session } = useSession();
	const { favoritePackages } = useAppSelector((state) => state.ADT);
	const { URL2ConnectSystem } = useAppSelector((state) => state.System);
	const { addFavoritePackageAction } = useAdtStore();

	const { getDataForConnection } = useSAPGeneral();
	const minCharSearch = 2;

	const searchPackages = useCallback(
		(event: any) => {
			let values = event.target.value as string;
			if (values.length >= minCharSearch) {
				setShowLabel(true);
				adtController
					.quickSearch(
						getDataForConnection("base"),
						ADT_OBJECT_TYPES.PACKAGES.OBJECT_TYPE,
						`${values}*`
					)
					.then((response: ResponseSearchObject) => {
						if (response.isSuccess) {
							let packagesFounded = response.getValue() as ADTSearchObjects;
							setPackagesFound(packagesFounded);
						} else {
							showResultError(response.getErrorValue() as ErrorGraphql);
						}
					});
			} else if (values.length == 0) {
				setShowLabel(false);
			}
		},
		[URL2ConnectSystem]
	);

	/**
	 * Gestiona el proceso de añadir el paquete tanto al modelo de datos como a la base de datos
	 */
	const handlerAddFavoritePackage = useCallback(() => {
		if (!packagesStateError) {
			if (
				favoritePackages.findIndex((row) => row.packageName == packageValue) ==
				-1
			) {
				setPackagesStateMessage("");
				adtController
					.AddFavoritePackage(session.email, packageValue)
					.then((response) => {
						if (response.isSuccess) {
							addFavoritePackageAction(
								response.getValue() as ADTFavoritePackage
							);
							onConfirmButton(packageValue);
						} else {
							showResultError(response.getErrorValue() as ErrorGraphql);
						}
						setPackageValue("");
					});
				onConfirmButton(packageValue);
			} else {
				setPackagesStateMessage(
					getI18nText(
						"adtIde.favoritePackages.popupAddPackage.packageDuplicate"
					)
				);
			}
		}
	}, [packageValue]);
	const checkDuplicatePackage = useCallback(
		(packageValue: string) => {
			if (
				favoritePackages.findIndex((row) => row.packageName == packageValue) ==
				-1
			) {
				setPackagesStateError(false);
				setPackagesStateMessage("");
			} else {
				setPackagesStateError(true);
				setPackagesStateMessage(
					getI18nText(
						"adtIde.favoritePackages.popupAddPackage.packageDuplicate"
					)
				);
			}
		},
		[favoritePackages]
	);

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className="sm:max-w-[40rem]">
				<DialogHeader>
					<DialogTitle>
						{getI18nText("adtIde.favoritePackages.popupAddPackage.title")}
					</DialogTitle>
					<DialogDescription>
						{getI18nText("adtIde.favoritePackages.popupAddPackage.description")}
					</DialogDescription>
				</DialogHeader>
				<div className="grid w-full max-w-sm items-center gap-1.5 pt-2">
					<Command>
						<CommandInput
							placeholder={getI18nText(
								"adtIde.favoritePackages.popupAddPackage.placeholder",
								{
									numChar: minCharSearch,
								}
							)}
							onInput={(event: any) => {
								searchPackages(event);
							}}
						/>
						{packageValue.length >= minCharSearch &&
							packagesFound.length == 0 && (
								<CommandEmpty>
									{getI18nText(
										"adtIde.favoritePackages.popupAddPackage.packagesNotFound"
									)}
								</CommandEmpty>
							)}
						<CommandGroup>
							{packagesFound.map((row) => {
								return (
									<CommandItem
										key={row.packageName}
										id={row.packageName}
										value={row.packageName}
										onSelect={(currentValue) => {
											let value = currentValue.toUpperCase();
											setPackageValue(value);
											checkDuplicatePackage(value);
										}}
									>
										<span
											className={cn(
												packageValue === row.packageName && packagesStateError
													? "text-red-500"
													: "text-current"
											)}
										>
											{`${row.packageName}`}
										</span>
										{packageValue === row.packageName &&
											!packagesStateError && (
												<CheckIcon
													className={cn(
														"ml-auto h-4 w-4",
														packageValue === row.packageName
															? "opacity-100"
															: "opacity-0"
													)}
												/>
											)}
										{packageValue === row.packageName && packagesStateError && (
											<span className="text-red-500 ml-auto">
												{getI18nText(
													"adtIde.favoritePackages.popupAddPackage.packageDuplicate"
												)}
											</span>
										)}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</Command>
				</div>
				<DialogFooter>
					<Button
						type="submit"
						onClick={handlerAddFavoritePackage}
					>
						{getI18nText("adtIde.favoritePackages.popupAddPackage.btnConfirm")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PopupAddPackageContainer;
