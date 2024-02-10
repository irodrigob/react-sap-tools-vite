import { FC, useState } from "react";
import { AdtPackageObjects } from "sap/adt/domain/entities/packageContent";

interface Props {
	packageName: string;
	category: string;
	objectType: string;
	objects: AdtPackageObjects;
}
const ObjectsList: FC<Props> = ({
	packageName,
	category,
	objectType,
	objects,
}) => {
	return (
		<div className="ml-9">
			{objects.map((row) => {
				const nodeKey = `${packageName}_${category}_${objectType}_${row.objectName}`;
				return (
					<div key={`${nodeKey}`}>
						<li
							className="hover:bg-slate-800 py-0.5"
							key={nodeKey}
						>
							<div className="flex items-center flex-row">
								<div className="shrink text-sm w-52">{row.objectName}</div>
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
