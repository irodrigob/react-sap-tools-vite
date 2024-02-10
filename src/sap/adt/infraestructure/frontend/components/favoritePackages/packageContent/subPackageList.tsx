import { FC, useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { TreeAttributeMap } from "sap/adt/infraestructure/types/tree";
import { AdtPackageContents } from "sap/adt/domain/entities/packageContent";
import useTreeFavoritePackages from "sap/adt/infraestructure/frontend/hooks/useTreeFavoritePackages";
import PackageContent from "./packageContent";

interface Props {
	packageParent: string;
	content: AdtPackageContents;
}

const SubPackageList: FC<Props> = ({ packageParent, content }) => {
	const { expandCollapseNode } = useTreeFavoritePackages();
	const [treeAttributesMap, setTreeAttributesMap] = useState<TreeAttributeMap>(
		{}
	);
	return (
		<>
			{content
				.filter((row) => row.objectNameParent == packageParent)
				.map((row) => {
					return (
						<div key={`${row.objectName}_container`}>
							<li
								className="hover:bg-slate-800"
								key={`${row.objectName}`}
							>
								<div className="flex items-center flex-row">
									<div className="flex-none">
										<Button
											variant="ghost"
											size="sm"
											onClick={() => {
												setTreeAttributesMap(
													expandCollapseNode(row.objectName, treeAttributesMap)
												);
											}}
										>
											{treeAttributesMap[row.objectName] &&
											treeAttributesMap[row.objectName].expanded ? (
												<ChevronDownIcon className="h-5 w-5" />
											) : (
												<ChevronRightIcon className="h-5 w-5" />
											)}
										</Button>
									</div>
									<div className="shrink text-sm w-52">{row.objectName}</div>
									<div className="grow">
										<div className="flex items-center justify-between flex-row-reverse"></div>
									</div>
								</div>
							</li>
							<div key={`${row.objectName}_content`}>
								{treeAttributesMap[row.objectName] &&
									treeAttributesMap[row.objectName].expanded && (
										<PackageContent
											packageName={row.objectName}
											content={content}
										/>
									)}
							</div>
						</div>
					);
				})}
		</>
	);
};

export default SubPackageList;
