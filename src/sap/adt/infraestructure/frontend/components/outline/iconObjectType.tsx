import { FC } from "react";
import AbapClass from "shared/frontend/icons/abapOutline/abapClass";
import AbapInclude from "shared/frontend/icons/abapOutline/abapInclude";
import AbapInterface from "shared/frontend/icons/abapOutline/abapInterface";
import AbapAttributePrivate from "shared/frontend/icons/abapOutline/abapAttributePrivate";
import AbapAttributeProtected from "shared/frontend/icons/abapOutline/abapAttributeProtected";
import AbapAttributePublic from "shared/frontend/icons/abapOutline/abapAttributePublic";
import AbapMethodPrivate from "shared/frontend/icons/abapOutline/abapMethodPrivate";
import AbapMethodProtected from "shared/frontend/icons/abapOutline/abapMethodProtected";
import AbapMethodPublic from "shared/frontend/icons/abapOutline/abapMethodPublic";
import AbapMethodUnknow from "shared/frontend/icons/abapOutline/abapMethodUnknow";
import AbapTypePrivate from "shared/frontend/icons/abapOutline/abapTypePrivate";
import AbapTypeProtected from "shared/frontend/icons/abapOutline/abapTypeProtected";
import AbapTypePublic from "shared/frontend/icons/abapOutline/abapTypePublic";
import {
	ADT_OBJECT_TYPES,
	VISIBILITY,
} from "sap/adt/infraestructure/constants/adtConstants";

interface Props {
	type: string;
	visibility?: string;
}
const IconObjectType: FC<Props> = ({ type, visibility }) => {
	return (
		<>
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.INTERFACE && <AbapInterface />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.DATA_CONSTANT &&
				visibility == VISIBILITY.PRIVATE && <AbapAttributePrivate />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.DATA_CONSTANT &&
				visibility == VISIBILITY.PROTECTED && <AbapAttributeProtected />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.DATA_CONSTANT &&
				visibility == VISIBILITY.PUBLIC && <AbapAttributePublic />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.METHOD &&
				visibility == VISIBILITY.PRIVATE && <AbapMethodPrivate />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.METHOD &&
				visibility == VISIBILITY.PROTECTED && <AbapMethodProtected />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.METHOD &&
				visibility == VISIBILITY.PUBLIC && <AbapMethodPublic />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.METHOD && <AbapMethodUnknow />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.TYPES &&
				visibility == VISIBILITY.PRIVATE && <AbapTypePrivate />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.TYPES &&
				visibility == VISIBILITY.PROTECTED && <AbapTypeProtected />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.TYPES &&
				visibility == VISIBILITY.PUBLIC && <AbapTypePublic />}
		</>
	);
};

export default IconObjectType;
