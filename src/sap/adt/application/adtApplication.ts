import { ApolloError } from "@apollo/client";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import AppStore from "shared/storage/appStore";
import {
	ResponseAddFavoritePackage,
	ResponseSearchObject,
	ResponseDeleteFavoritePackage,
	ResponseFavoritePackages,
	ResponsePackageContent,
} from "sap/adt/infraestructure/types/adt";
import SAPAdtRepository from "sap/adt/infraestructure/repositories/sapAdtRepository";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import {
	ADTFavoritePackage,
	ADTFavoritePackages,
} from "sap/adt/domain/entities/favoritePackage";
import { AdtPackageContents } from "sap/adt/domain/entities/packageContent";
import { ADTFavoritePackageDTO } from "sap/adt/infraestructure/dto/favoritePackagesDTO";

export default class AdtApplication {
	private appStore: AppStore;
	private adtRepository: SAPAdtRepository;

	constructor() {
		this.appStore = new AppStore();
		this.adtRepository = new SAPAdtRepository();
	}
	/**
	 * Búsqueda de objeto por un tipo/subtipo de objetos
	 * @param dataConnection Datos conexión
	 * @param objectType Tipo de objeto
	 * @param legacyType Subtipo de objeto
	 * @param searchQuery objeto a buscar
	 * @returns Resultado de la búsqueda
	 */
	async searchObjectSingleType(
		dataConnection: DataConnectionSystem,
		objectType: string,
		legacyType: string,
		searchQuery: string
	): Promise<ResponseSearchObject> {
		try {
			let response = await this.adtRepository.searchObjectSingleType(
				dataConnection,
				objectType,
				legacyType,
				searchQuery
			);
			return Result.ok(response);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
	/**
	 * Búsqueda rápida de objetos por tipo
	 * @param dataConnection Datos conexión
	 * @param objectType Tipo de objeto
	 * @param searchQuery objeto a buscar
	 * @returns Resultado de la búsqueda
	 */
	async quickSearch(
		dataConnection: DataConnectionSystem,
		objectType: string,
		searchQuery: string
	): Promise<ResponseSearchObject> {
		try {
			let response = await this.adtRepository.quickSearchObject(
				dataConnection,
				objectType,
				searchQuery
			);
			return Result.ok(response);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
	/**
	 * Añade un paquete favorito
	 * @param user Usuario
	 * @param packageName Nombre del paquete
	 */
	async AddFavoritePackage(
		user: string,
		packageName: string
	): Promise<ResponseAddFavoritePackage> {
		try {
			let response = await this.adtRepository.AddFavoritePackage(
				user,
				packageName
			);
			// Como es un PUT la actualización SAP no devuelve datos por ello devuelvo un undefinied, porque el void no me deja.
			return Result.ok<ADTFavoritePackage>({
				_id: response._id,
				packageName: response.packageName,
				content: [],
			});
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
	/**
	 * Devuelve los paquetes favoritos de un usuario
	 * @param user Usuario
	 */
	async getFavoritePackages(user: string): Promise<ResponseFavoritePackages> {
		try {
			let response = await this.adtRepository.getFavoritePackages(user);
			let values: ADTFavoritePackages = response.map(
				(row: ADTFavoritePackageDTO) => {
					return {
						_id: row._id,
						packageName: row.packageName,
						content: [],
					};
				}
			);
			return Result.ok(values);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
	/**
	 * Borra un paquete favorito
	 * @param id Id del paquete favorito
	 */
	async deleteFavoritePackage(
		id: string
	): Promise<ResponseDeleteFavoritePackage> {
		try {
			let response = await this.adtRepository.deleteFavoritePackage(id);
			// Como es un PUT la actualización SAP no devuelve datos por ello devuelvo un undefinied, porque el void no me deja.
			return Result.ok({ ...response, content: [] });
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}

	/**
	 * Devuelve el contenido de un paquete y sus posibles subpaquetes
	 * @param packageName Nombre del paquete
	 * @param dataConnection: DataConnectionSystem,
	 */
	async getPackageContent(
		dataConnection: DataConnectionSystem,
		packageName: string
	): Promise<ResponsePackageContent> {
		try {
			let response = await this.adtRepository.getPackageContent(
				dataConnection,
				packageName
			);

			return Result.ok(response);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
}
