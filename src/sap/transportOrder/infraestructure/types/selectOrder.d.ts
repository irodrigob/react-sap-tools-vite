export type OrderData = {
	orderDesc: string;
	order: string;
	isTask: boolean;
};
export type OrdersData = OrderData[];
export enum SelectorComponentType {
	inputWithTitle = "inputWTitle",
	input = "input",
	combobox = "combobox",
}
