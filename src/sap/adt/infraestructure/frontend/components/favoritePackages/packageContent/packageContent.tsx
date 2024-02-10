import { FC, useEffect, useState } from "react";
import { AdtPackageContents } from "sap/adt/domain/entities/packageContent";
import { AdtPackageCategories } from "sap/adt/domain/entities/packageContent";
import SubPackageList from "./subPackageList";
import PackageWOData from "./packageWOData";
import CategoriesList from "./categoriesList";

interface Props {
	packageName: string;
	content: AdtPackageContents;
}
const PackageContent: FC<Props> = ({ packageName, content }) => {
	const [haveObjects, setHaveObjects] = useState<boolean>();
	const [haveSubPackages, setHaveSubPackages] = useState<boolean>();
	// Este state es para evitar el efecto raro que muestra el texto de no hay datos
	// mientras se procesa el useEffect
	const [showNoData, setShowNoData] = useState(false);
	const [categories, setCategories] = useState<AdtPackageCategories>([]);

	useEffect(() => {
		let haveObjects = false;
		let haveSubPackages = false;
		// Se mira si tiene objetos
		let contentPackage = content.find((row) => row.objectName == packageName);
		if (contentPackage && contentPackage.categories.length > 0) {
			haveObjects = true;
			setCategories(contentPackage.categories);
		}

		// Se mira si tiene subpaquetes
		if (content.findIndex((row) => row.objectNameParent == packageName) != -1)
			haveSubPackages = true;

		setHaveObjects(haveObjects);
		setHaveSubPackages(haveSubPackages);

		if (!haveObjects && !haveSubPackages) setShowNoData(true);
	}, [packageName, content]);

	// En la visualización primero se van a pintar los paquetes y luego los objetos
	return (
		<>
			{(haveObjects || haveSubPackages) && (
				<div className="ml-3">
					<ul className="list-none">
						{haveSubPackages && (
							<SubPackageList
								packageParent={packageName}
								content={content}
							/>
						)}
						{haveObjects && (
							<CategoriesList
								categories={categories}
								packageName={packageName}
							/>
						)}
					</ul>
				</div>
			)}
			{showNoData && <PackageWOData />}
		</>
	);
};

export default PackageContent;
