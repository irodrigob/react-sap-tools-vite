import { FC } from "react";
import { AdtPackageObjects } from "sap/adt/domain/entities/packageContent";
import FileCode from "shared/frontend/icons/fileCode";
import Database from "shared/frontend/icons/database";
import { OBJECTTYPES_DEVELOP_EDIT } from "sap/adt/infraestructure/constants/adtConstants";

interface Props {
	packageName: string;
	category: string;
	objectType: string;
	objects: AdtPackageObjects;
}

const iconFromCategory = (category: string) => {
	if (category == "dictionary") return <Database className="h-4 w-4" />;
	return <FileCode className="h-4 w-4" />;
};

const ObjectsList: FC<Props> = ({
	packageName,
	category,
	objectType,
	objects,
}) => {
	return (
		<div className="ml-8">
			{objects.map((row) => {
				const nodeKey = `${packageName}_${category}_${objectType}_${row.objectName}`;
				const editorDeveloped =
					OBJECTTYPES_DEVELOP_EDIT.findIndex(
						(rowObjectTypEditor) => rowObjectTypEditor == objectType
					) == -1
						? false
						: true;
				return (
					<div key={`${nodeKey}`}>
						<li
							className="hover:bg-slate-800 py-1"
							key={nodeKey}
						>
							<div className="flex items-center flex-row">
								<div className="shrink text-sm">
									<div className="flex items-center flex-row space-x-2">
										{iconFromCategory(category)}
										<span
											className={`${editorDeveloped ? "cursor-pointer" : ""}`}
											onClick={() => {
												if (editorDeveloped) {
													alert("hola");
												}
											}}
										>
											{row.objectName}
										</span>
									</div>
								</div>
								<div className="grow">
									<div className="flex items-center justify-between flex-row-reverse"></div>
								</div>
							</div>
						</li>
					</div>
				);
			})}
		</div>
	);
};

export default ObjectsList;
