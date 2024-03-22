export type ADTObjectMessage = {
	shortText: string;
	type: string;
	pos: string;
	quickFix: boolean;
};
export type ADTObjectMessages = ADTObjectMessage[];

export type ADTObjectCheckRun = {
	statusText: string;
	status: string;
	triggeringUri: string;
	messagesList: ADTObjectMessages;
};
