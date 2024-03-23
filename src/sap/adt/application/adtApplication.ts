import { ApolloError } from "@apollo/client";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import {
	ResponseAddFavoritePackage,
	ResponseSearchObject,
	ResponseDeleteFavoritePackage,
	ResponseFavoritePackages,
	ResponsePackageContent,
	ResponseRepositoryCheckRuns,
} from "sap/adt/infraestructure/types/adt";
import SAPAdtRepository from "sap/adt/infraestructure/repositories/sapAdtRepository";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import {
	ADTFavoritePackage,
	ADTFavoritePackages,
} from "sap/adt/domain/entities/favoritePackage";
import { ADTFavoritePackageDTO } from "sap/adt/infraestructure/dto/favoritePackagesDTO";
import { INIT_FAVORITE_PACKAGE } from "sap/adt/infraestructure/constants/treeConstants";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";

export default class AdtApplication {
	private adtRepository: SAPAdtRepository;

	constructor() {
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
				...INIT_FAVORITE_PACKAGE,
				_id: response._id,
				packageName: response.packageName,
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
						...INIT_FAVORITE_PACKAGE,
						_id: row._id,
						packageName: row.packageName,
					};
				}
			);
			// Se añade el paquete principal local al principio
			values.unshift({
				...INIT_FAVORITE_PACKAGE,
				packageName: ADT_OBJECT_TYPES.PACKAGES.MAIN_LOCAL_PACKAGE,
			});
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
			return Result.ok({ ...INIT_FAVORITE_PACKAGE, ...response });
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
	/**
	 * Recupera los tipos de objeto que se pueden lanzar su validación
	 * @param dataConnection Datos de conexión
	 */
	async repositoryCheckRun(
		dataConnection: DataConnectionSystem
	): Promise<ResponseRepositoryCheckRuns> {
		try {
			let response = await this.adtRepository.repositoryCheckRun(
				dataConnection
			);
			// Hay registros que vienen con "*" en ciertos tipo, lo quito porque no los necesito
			let newValues = response.map((row) => {
				return { type: row.type.replace("*", "") };
			});

			return Result.ok(newValues);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
}
