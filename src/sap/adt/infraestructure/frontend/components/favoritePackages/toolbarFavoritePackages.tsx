import { FC, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import PopupAddPackageContainer from "./popupAddPackageContainer";
import AddFavorite from "shared/frontend/icons/add-Favorite";
import TooltipCustom from "shared/frontend/components/tooltipCustom";
import { useTranslations } from "translations/i18nContext";

const ToolbarFavoritePackages: FC = () => {
	const [openAddPackage, setOpenAddPackage] = useState(false);
	const handlerAddPackage = useCallback((packageName: string) => {
		setOpenAddPackage(false);
	}, []);
	const { getI18nText } = useTranslations();

	return (
		<>
			<div className="flex items-center justify-between flex-row-reverse">
				<Button
					onClick={() => setOpenAddPackage(true)}
					variant="ghost"
					size="icon"
				>
					<div className="ml-auto px-3">
						<TooltipCustom
							text={getI18nText(
								"adtIde.favoritePackages.addFavoritePackageTooltip"
							)}
							side="bottom"
						>
							<AddFavorite className="h-5 w-5 text-blue-500" />
						</TooltipCustom>
					</div>
				</Button>
			</div>
			<PopupAddPackageContainer
				open={openAddPackage}
				onOpenChange={setOpenAddPackage}
				onConfirmButton={handlerAddPackage}
			/>
		</>
	);
};

export default ToolbarFavoritePackages;
