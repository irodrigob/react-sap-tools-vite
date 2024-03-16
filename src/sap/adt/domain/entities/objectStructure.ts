export type ADTBlockInfoElement = {
	block?: string;
	startPos: string;
	endPos: string;
};
export type ADTBlockInfoElements = ADTBlockInfoElement[];
export type ADTStructureElement = {
	name: string;
	type: string;
	typeDesc: string;
	visibility?: string;
	sourceUri: string;
	isEventHandlerMethod: boolean;
	isConstructor: boolean;
	isRedefinition: boolean;
	isReadOnly: boolean;
	isConstant: boolean;
	blockInfo: ADTBlockInfoElements;
};
export type ADTStructureElements = ADTStructureElement[];
export type ADTObjectStructure = {
	name: string;
	type: string;
	typeDesc: string;
	structureElements: ADTStructureElements;
};
