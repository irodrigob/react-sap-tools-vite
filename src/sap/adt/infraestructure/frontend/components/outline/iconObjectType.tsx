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
import AbapTypeGroup from "shared/frontend/icons/abapOutline/abapTypeGroup";
import AbapType from "shared/frontend/icons/abapOutline/abapType";
//import AbapTestSeam from "shared/frontend/icons/abapOutline/abapTestSeam";
import AbapSoubrutine from "shared/frontend/icons/abapOutline/abapSubroutine";
import AbapMacro from "shared/frontend/icons/abapOutline/abapMacro";
import AbapFunctionModule from "shared/frontend/icons/abapOutline/abapFunctionModule";
import AbapFunctionGroup from "shared/frontend/icons/abapOutline/abapFunctionGroup";
import AbapClassFriend from "shared/frontend/icons/abapOutline/abapClassFriend";
import AbapEventPublic from "shared/frontend/icons/abapOutline/abapEventPublic";
import AbapEventPrivate from "shared/frontend/icons/abapOutline/abapEventPrivate";
import AbapEventProtected from "shared/frontend/icons/abapOutline/abapEventProtected";
import AbapMethodHandlerPublic from "shared/frontend/icons/abapOutline/abapMethodHandlerPublic";
import AbapMethodHandlerProtected from "shared/frontend/icons/abapOutline/abapMethodHandlerProtected";
import AbapMethodHandlerPrivate from "shared/frontend/icons/abapOutline/abapMethodHandlerPrivate";
import AbapDecoratorTest from "shared/frontend/icons/abapOutline/abapDecoratorTest";
import AbapDecoratorStaticMember from "shared/frontend/icons/abapOutline/abapDecoratorStaticMember";
import AbapDecoratorSendingEvent from "shared/frontend/icons/abapOutline/abapDecoratorSendingEvent";
import AbapDecoratorRedefinition from "shared/frontend/icons/abapOutline/abapDecoratorRedefinition";
import AbapDecoratorReceivingEvent from "shared/frontend/icons/abapOutline/abapDecoratorReceivingEvent";
import AbapDecoratorReadOnly from "shared/frontend/icons/abapOutline/abapDecoratorReadOnly";
import AbapDecoratorFinalMember from "shared/frontend/icons/abapOutline/abapDecoratorFinalMember";
import AbapDecoratorConstructor from "shared/frontend/icons/abapOutline/abapDecoratorConstructor";
import AbapDecoratorConstant from "shared/frontend/icons/abapOutline/abapDecoratorConstant";
import AbapDecoratorAbstractMember from "shared/frontend/icons/abapOutline/abapDecoratorAbstractMember";
import AbapProgram from "shared/frontend/icons/abapOutline/abapProgram";

import {
	ADT_OBJECT_TYPES,
	VISIBILITY,
} from "sap/adt/infraestructure/constants/adtConstants";

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
	//{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.METHOD && <AbapMethodUnknow />}
	return (
		<div className="flex items-center flex-row space-x-2">
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.INTERFACE && <AbapInterface />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.DATA_CONSTANT &&
				visibility == VISIBILITY.PRIVATE && <AbapAttributePrivate />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.DATA_CONSTANT &&
				visibility == VISIBILITY.PROTECTED && <AbapAttributeProtected />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.DATA_CONSTANT &&
				visibility == VISIBILITY.PUBLIC && <AbapAttributePublic />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.METHOD &&
				visibility == VISIBILITY.PRIVATE &&
				!isEventHandlerMethod && <AbapMethodPrivate />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.METHOD &&
				visibility == VISIBILITY.PROTECTED &&
				!isEventHandlerMethod && <AbapMethodProtected />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.METHOD &&
				visibility == VISIBILITY.PUBLIC &&
				!isEventHandlerMethod && <AbapMethodPublic />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.METHOD &&
				visibility == VISIBILITY.PRIVATE &&
				isEventHandlerMethod && <AbapMethodHandlerPrivate />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.METHOD &&
				visibility == VISIBILITY.PROTECTED &&
				isEventHandlerMethod && <AbapMethodHandlerProtected />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.METHOD &&
				visibility == VISIBILITY.PUBLIC &&
				isEventHandlerMethod && <AbapMethodHandlerPublic />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.TYPES &&
				visibility == VISIBILITY.PRIVATE && <AbapTypePrivate />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.TYPES &&
				visibility == VISIBILITY.PROTECTED && <AbapTypeProtected />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.TYPES &&
				visibility == VISIBILITY.PUBLIC && <AbapTypePublic />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.FRIEND && <AbapClassFriend />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.MACRO && <AbapMacro />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.CLASS_INCLUDE_MACRO && (
				<AbapMacro />
			)}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.EVENT &&
				visibility == VISIBILITY.PUBLIC && <AbapEventPublic />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.EVENT &&
				visibility == VISIBILITY.PRIVATE && <AbapEventPrivate />}
			{type == ADT_OBJECT_TYPES.CLASSES.SUBTYPES.EVENT &&
				visibility == VISIBILITY.PROTECTED && <AbapEventProtected />}

			{type == ADT_OBJECT_TYPES.DICTIONARY.SUBTYPES.TYPE_GROUP && (
				<AbapTypeGroup />
			)}
			{type == ADT_OBJECT_TYPES.DICTIONARY.SUBTYPES.TYPE && <AbapType />}
			{type == ADT_OBJECT_TYPES.PROGRAM.SUBTYPES.SUBROUTINE && (
				<AbapSoubrutine />
			)}
			{type == ADT_OBJECT_TYPES.PROGRAM.SUBTYPES.INCLUDE && <AbapInclude />}
			{type == ADT_OBJECT_TYPES.PROGRAM.SUBTYPES.MACRO && <AbapMacro />}

			{type == ADT_OBJECT_TYPES.FUNCTION.SUBTYPES.MODULE && (
				<AbapFunctionModule />
			)}
			{type == ADT_OBJECT_TYPES.FUNCTION.SUBTYPES.GROUP && (
				<AbapFunctionGroup />
			)}
			{type == ADT_OBJECT_TYPES.PROGRAM.SUBTYPES.PROGRAM && <AbapProgram />}

			{isReadOnly && <AbapDecoratorReadOnly />}
			{isConstructor && <AbapDecoratorConstructor />}
			{isConstant && <AbapDecoratorConstant />}
			{isRedefinition && <AbapDecoratorRedefinition />}
		</div>
	);
};

export default IconObjectType;
