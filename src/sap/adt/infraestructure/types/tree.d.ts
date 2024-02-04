export type TreeAttribute = {
	expanded: boolean;
	loadingData?: boolean;
};

export type TreeAttributeMap = Record<string, TreeAttribute>;
