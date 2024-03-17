import { FC } from "react";
import {
	ADT_OBJECT_TYPES,
	VISIBILITY,
} from "sap/adt/infraestructure/constants/adtConstants";
import AbapClass from "shared/frontend/icons/abap/abapClass";
import AbapInclude from "shared/frontend/icons/abap/abapInclude";
import AbapInterface from "shared/frontend/icons/abap/abapInterface";
import AbapAttributePrivate from "shared/frontend/icons/abap/abapAttributePrivate";
import AbapAttributeProtected from "shared/frontend/icons/abap/abapAttributeProtected";
import AbapAttributePublic from "shared/frontend/icons/abap/abapAttributePublic";
import AbapMethodPrivate from "shared/frontend/icons/abap/abapMethodPrivate";
import AbapMethodProtected from "shared/frontend/icons/abap/abapMethodProtected";
import AbapMethodPublic from "shared/frontend/icons/abap/abapMethodPublic";
import AbapMethodUnknow from "shared/frontend/icons/abap/abapMethodUnknow";
import AbapTypePrivate from "shared/frontend/icons/abap/abapTypePrivate";
import AbapTypeProtected from "shared/frontend/icons/abap/abapTypeProtected";
import AbapTypePublic from "shared/frontend/icons/abap/abapTypePublic";
import AbapTypeGroup from "shared/frontend/icons/abap/abapTypeGroup";
import AbapType from "shared/frontend/icons/abap/abapType";
//import AbapTestSeam from "shared/frontend/icons/abap/abapTestSeam";
import AbapSoubrutine from "shared/frontend/icons/abap/abapSubroutine";
import AbapMacro from "shared/frontend/icons/abap/abapMacro";
import AbapFunctionModule from "shared/frontend/icons/abap/abapFunctionModule";
import AbapFunctionGroup from "shared/frontend/icons/abap/abapFunctionGroup";
import AbapClassFriend from "shared/frontend/icons/abap/abapClassFriend";
import AbapEventPublic from "shared/frontend/icons/abap/abapEventPublic";
import AbapEventPrivate from "shared/frontend/icons/abap/abapEventPrivate";
import AbapEventProtected from "shared/frontend/icons/abap/abapEventProtected";
import AbapMethodHandlerPublic from "shared/frontend/icons/abap/abapMethodHandlerPublic";
import AbapMethodHandlerProtected from "shared/frontend/icons/abap/abapMethodHandlerProtected";
import AbapMethodHandlerPrivate from "shared/frontend/icons/abap/abapMethodHandlerPrivate";
import AbapDecoratorTest from "shared/frontend/icons/abap/abapDecoratorTest";
import AbapDecoratorStaticMember from "shared/frontend/icons/abap/abapDecoratorStaticMember";
import AbapDecoratorSendingEvent from "shared/frontend/icons/abap/abapDecoratorSendingEvent";
import AbapDecoratorRedefinition from "shared/frontend/icons/abap/abapDecoratorRedefinition";
import AbapDecoratorReceivingEvent from "shared/frontend/icons/abap/abapDecoratorReceivingEvent";
import AbapDecoratorReadOnly from "shared/frontend/icons/abap/abapDecoratorReadOnly";
import AbapDecoratorFinalMember from "shared/frontend/icons/abap/abapDecoratorFinalMember";
import AbapDecoratorConstructor from "shared/frontend/icons/abap/abapDecoratorConstructor";
import AbapDecoratorConstant from "shared/frontend/icons/abap/abapDecoratorConstant";
import AbapDecoratorAbstractMember from "shared/frontend/icons/abap/abapDecoratorAbstractMember";
import AbapProgram from "shared/frontend/icons/abap/abapProgram";
import AbapGeneric from "shared/frontend/icons/abap/abapGeneric";
import DdicDomain from "@/shared/frontend/icons/abap/ddicDomain";
import DdicDataElement from "@/shared/frontend/icons/abap/ddicDataElement";
import DdicStructure from "@/shared/frontend/icons/abap/ddicStructure";
import DdicTable from "@/shared/frontend/icons/abap/ddicTable";
import DdicTableType from "@/shared/frontend/icons/abap/ddicTableType";

interface Props {
	type: string;
	visibility?: string;
	isEventHandlerMethod?: boolean;
	isConstructor?: boolean;
	isRedefinition?: boolean;
	isReadOnly?: boolean;
	isConstant?: boolean;
	isFinalMember?: boolean;
}
const IconObjectType: FC<Props> = ({
	type,
	visibility,
	isConstant,
	isConstructor,
	isEventHandlerMethod,
	isReadOnly,
	isRedefinition,
}) => {
	let icono = <AbapGeneric />;
	if (type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.CLASS) icono = <AbapClass />;
	else if (type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.INTERFACE)
		icono = <AbapInterface />;
	else if (type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.DATA_CONSTANT) {
		if (visibility == VISIBILITY.PRIVATE) icono = <AbapAttributePrivate />;
		if (visibility == VISIBILITY.PROTECTED) icono = <AbapAttributeProtected />;
		if (visibility == VISIBILITY.PUBLIC) icono = <AbapAttributePublic />;
	} else if (type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.METHOD) {
		icono = <AbapMethodUnknow />;
		if (isEventHandlerMethod) {
			if (visibility == VISIBILITY.PRIVATE)
				icono = <AbapMethodHandlerPrivate />;
			if (visibility == VISIBILITY.PROTECTED)
				icono = <AbapMethodHandlerProtected />;
			if (visibility == VISIBILITY.PUBLIC) icono = <AbapMethodHandlerPublic />;
		} else {
			if (visibility == VISIBILITY.PRIVATE) icono = <AbapMethodPrivate />;
			if (visibility == VISIBILITY.PROTECTED) icono = <AbapMethodProtected />;
			if (visibility == VISIBILITY.PUBLIC) icono = <AbapMethodPublic />;
		}
	} else if (type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.TYPES) {
		if (visibility == VISIBILITY.PRIVATE) icono = <AbapTypePrivate />;
		if (visibility == VISIBILITY.PROTECTED) icono = <AbapTypeProtected />;
		if (visibility == VISIBILITY.PUBLIC) icono = <AbapTypePublic />;
	} else if (type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.FRIEND)
		icono = <AbapClassFriend />;
	else if (
		type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.MACRO ||
		type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.CLASS_INCLUDE_MACRO
	)
		icono = <AbapMacro />;
	else if (type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.EVENT) {
		if (visibility == VISIBILITY.PRIVATE) icono = <AbapEventPrivate />;
		if (visibility == VISIBILITY.PROTECTED) icono = <AbapEventProtected />;
		if (visibility == VISIBILITY.PUBLIC) icono = <AbapEventPublic />;
	} else if (type == ADT_OBJECT_TYPES.INTERFACES.SUBTYPES.INTERFACE)
		icono = <AbapInterface />;
	else if (type == ADT_OBJECT_TYPES.DICTIONARY.SUBTYPES.TYPE_GROUP)
		icono = <AbapTypeGroup />;
	else if (type == ADT_OBJECT_TYPES.DICTIONARY.SUBTYPES.TYPE)
		icono = <AbapType />;
	else if (type == ADT_OBJECT_TYPES.PROGRAM.SUBTYPES.SUBROUTINE)
		icono = <AbapSoubrutine />;
	else if (type == ADT_OBJECT_TYPES.PROGRAM.SUBTYPES.INCLUDE)
		icono = <AbapInclude />;
	else if (type == ADT_OBJECT_TYPES.PROGRAM.SUBTYPES.MACRO)
		icono = <AbapMacro />;
	else if (type == ADT_OBJECT_TYPES.FUNCTION.SUBTYPES.MODULE)
		icono = <AbapFunctionModule />;
	else if (type == ADT_OBJECT_TYPES.FUNCTION.SUBTYPES.GROUP)
		icono = <AbapFunctionGroup />;
	else if (type == ADT_OBJECT_TYPES.PROGRAM.SUBTYPES.PROGRAM)
		icono = <AbapProgram />;
	else if (type == ADT_OBJECT_TYPES.DICTIONARY.SUBTYPES.DOMAIN)
		icono = <DdicDomain />;
	else if (type == ADT_OBJECT_TYPES.DICTIONARY.SUBTYPES.DATA_ELEMENT)
		icono = <DdicDataElement />;
	else if (type == ADT_OBJECT_TYPES.DICTIONARY.SUBTYPES.STRUCTURE)
		icono = <DdicStructure />;
	else if (type == ADT_OBJECT_TYPES.DICTIONARY.SUBTYPES.TABLE)
		icono = <DdicTable />;
	else if (type == ADT_OBJECT_TYPES.DICTIONARY.SUBTYPES.TABLE_TYPE)
		icono = <DdicTableType />;

	return (
		<div className="flex items-center flex-row space-x-2">
			{icono}

			{isReadOnly && <AbapDecoratorReadOnly />}
			{isConstructor && <AbapDecoratorConstructor />}
			{isConstant && <AbapDecoratorConstant />}
			{isRedefinition && <AbapDecoratorRedefinition />}
		</div>
	);
};

export default IconObjectType;
