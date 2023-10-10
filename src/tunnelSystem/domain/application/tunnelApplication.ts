import { ApolloError } from "@apollo/client";
import TunnelRepository from "tunnelSystem/infraestructure/repositories/tunnelRepository";
import TunnelConfiguration from "tunnelSystem/domain/entities/configuration";
import {
	responseTunnelRepoArray,
	responseTunnelFromHost,
} from "tunnelSystem/infraestructure/types/repository";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import ErrorGeneral from "shared/errors/errorGeneral";
import Tunnel from "tunnelSystem/domain/entities/tunnel";
import Encrypt from "shared/utils/encrypt/encrypt";

export default class TunnelApplication {
	private _tunnelRepository: TunnelRepository;

	constructor() {
		this._tunnelRepository = new TunnelRepository();
	}
	/**
	 * Devuelve la lista de tuneles activo
	 * @param apiToken | Token de conexión con la API
	 * @returns | Promise con el resultado o error del proceso
	 */
	async getTunnels(apiToken: string): Promise<responseTunnelRepoArray> {
		try {
			let data = await this._tunnelRepository.getTunnels(apiToken);
			return Result.ok<Tunnel[]>(data);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
	/**
	 * Devuelve el contenido para el fichero que lanza el tunnel
	 * @param host | Host donde hay que hacer el tunnel
	 * @returns String con el contenido a guardar en el fichero
	 */
	getContentLaunchTunnelDocker(
		host: string,
		configuration: TunnelConfiguration
	): string {
		if (configuration.authToken != "")
			return `docker run -it -e NGROK_AUTHTOKEN=${Encrypt.decryptText(
				configuration.authToken
			)} ngrok/ngrok http ${host}`;
		else return `docker run -it ngrok/ngrok http ${host}`;
	}
	/**
	 * Devuelve el contenido para el fichero que lanza el tunnel para el ejecutable
	 * @param host | Host donde hay que hacer el tunnel
	 * @returns String con el contenido a guardar en el fichero
	 */
	getContentLaunchTunnelExe(
		host: string,
		configuration: TunnelConfiguration
	): string {
		return `ngrok http ${host}`;
	}
	/**
	 * Devuelve la URL del tunnel a partir del Host pasado por parámetro.
	 * @param host | Host donde mira el tunel
	 * @returns | Promise con el resultado o error del proceso
	 */
	async getTunnelURLFromHost(
		host: string,
		apiToken: string
	): Promise<responseTunnelFromHost> {
		let tunnels = await this.getTunnels(apiToken);

		if (tunnels.isSuccess) {
			let tunnelsList = tunnels.getValue() as Tunnel[];

			if (tunnelsList.length > 0) {
				// Se mira que exista algún tunel para el sistema seleccionado
				let tunnelSystemSelected = tunnelsList.find(
					(row) => row.forwards_to.indexOf(host) != -1
				) as Tunnel;

				if (tunnelSystemSelected) {
					return Result.ok<string>(tunnelSystemSelected.public_url);
				} else {
					return Result.fail<ErrorGeneral>(
						ErrorGeneral.createI18n("tunneling.noTunnelsConnected")
					);
				}
			} else {
				return Result.fail<ErrorGeneral>(
					ErrorGeneral.createI18n("tunneling.noTunnelsConnected")
				);
			}
		} else {
			let error = tunnels.getErrorValue() as ErrorGraphql;

			return Result.fail<ErrorGeneral>(
				ErrorGeneral.create(error.getError().singleMessage as string)
			);
		}
	}
}
