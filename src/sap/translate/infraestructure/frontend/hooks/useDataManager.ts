import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import { AddObjects2Order } from "sap/translate/infraestructure/dto/addObjects2Order";

export default function useDataManager() {
	const convertObjectTexts2AddObjects = (
		objectTexts: ObjectsText
	): AddObjects2Order => {
		let tempAddObjects: AddObjects2Order = [];
		objectTexts.forEach((rowOrderText) => {
			if (
				tempAddObjects.findIndex(
					(rowAdd) =>
						rowAdd.object == rowOrderText.object &&
						rowAdd.objName == rowOrderText.objName
				) == -1
			)
				tempAddObjects.push({
					object: rowOrderText.object,
					objName: rowOrderText.objName,
				});
		});
		return tempAddObjects;
	};

	return { convertObjectTexts2AddObjects };
}
