import {
	Button,
	Icon,
	Panel,
	Text,
	Title,
	Toolbar,
	Tree,
	TreeItem,
	TreeItemCustom,
} from "@ui5/webcomponents-react";
import ToolbarFavoritePackages from "./toolbarFavoritePackages";

export default function FavoritePackagesContainer() {
	return (
		<Panel
			header={<ToolbarFavoritePackages />}
			headerText="Paquetes favoritos"
			onToggle={function _a() {}}
			style={{ marginLeft: "0.5rem", paddingTop: "0.5rem" }}
		>
			<Tree
				onItemClick={function _a() {}}
				onItemDelete={function _a() {}}
				onItemMouseout={function _a() {}}
				onItemMouseover={function _a() {}}
				onItemToggle={function _a() {}}
				onSelectionChange={function _a() {}}
			>
				<TreeItem
					expanded
					icon="paste"
					selected
					text="Tree 1"
				>
					<TreeItem
						expanded
						selected
						text="Tree 1.1"
					>
						<TreeItem text="Tree 1.1.1" />
						<TreeItem text="Tree 1.1.2" />
					</TreeItem>
				</TreeItem>
				<TreeItem
					icon="copy"
					text="Tree 2"
				>
					<TreeItem text="Tree 2.1">
						<TreeItem text="Tree 2.1.1" />
						<TreeItem text="Tree 2.1.2">
							<TreeItem text="Tree 2.1.2.1" />
							<TreeItem text="Tree 2.1.2.2" />
							<TreeItem text="Tree 2.1.2.3" />
							<TreeItem text="Tree 2.1.2.5" />
						</TreeItem>
					</TreeItem>
					<TreeItem text="Tree 2.2" />
				</TreeItem>
				<TreeItem text="Tree 3 (no icon)" />
				<TreeItemCustom
					content={
						<div style={{ alignItems: "center", display: "flex" }}>
							<Icon
								name="general-leave-request"
								style={{ marginInlineEnd: "2rem" }}
							/>
							<Text>I'm a fully customizable TreeItemCustom!</Text>
							<Button>Btn</Button>
							<Icon
								name="general-leave-request"
								style={{ marginInlineStart: "2rem" }}
							/>
						</div>
					}
				/>
			</Tree>
		</Panel>
	);
}
