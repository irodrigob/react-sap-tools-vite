export type ADTClassMetadata = {
	modeled: boolean;
	activeUnicodeCheck: boolean;
	fixPointArithmetic: boolean;
	changedAt: Date;
	changedBy: string;
	createdAt: Date;
	createdBy: string;
	description: string;
	descriptionTextLimit: number;
	language: string;
	masterLanguage: string;
	masterSystem: string;
	name: string;
	responsible: string;
	type: string;
	version: boolean;
	abstract: boolean;
	category: string;
	final: boolean;
	sharedMemoryEnabled: boolean;
	visibility: string;
	packageRefName: string;
	packageRefType: string;
};

export type ADTClassSourceInclude = {
	sourceUri: string;
	contentSource: string;
	changedAt: Date;
	changedBy: string;
	createdAt: Date;
	createdBy: string;
	name: string;
	type: string;
	version: string;
	includeType: string;
};
export type ADTClassSourceIncludes = ADTClassSourceInclude[];

export type ADTClassContent = {
	metadata: ADTClassMetadata;
	sourceIncludes: ADTClassSourceIncludes;
};
