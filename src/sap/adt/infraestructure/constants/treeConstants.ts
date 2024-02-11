import { ADTFavoritePackage } from "sap/adt/domain/entities/favoritePackage";
import FileCode from "shared/frontend/icons/fileCode";
import Database from "shared/frontend/icons/database";

export const INIT_FAVORITE_PACKAGE: ADTFavoritePackage = {
	_id: "",
	packageName: "",
	content: [],
	loadingContent: false,
	loadedContent: false,
};
