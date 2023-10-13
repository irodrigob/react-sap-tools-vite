import {
	responseTunnelRepoArray,
	responseTunnelConfigRepo,
	responseTunnelProviderRepoArray,
	responseTunnelFromHost,
} from "tunnelSystem/infraestructure/types/repository";
import TunnelApplication from "tunnelSystem/domain/application/tunnelApplication";
import TunnelConfiguration from "tunnelSystem/domain/entities/configuration";
import TunnelConfigurationApplication from "tunnelSystem/domain/application/configurationApplication";
import TunnelProviderApplication from "tunnelSystem/domain/application/tunnelProvider";
import FileAs from "shared/utils/file/fileAs";

export default class TunnelController {
	protected tunnelApplication: TunnelApplication;
	protected tunnelConfApplication: TunnelConfigurationApplication;
	protected tunnelProviderApplication: TunnelProviderApplication;

	constructor() {
		this.tunnelApplication = new TunnelApplication();
		this.tunnelConfApplication = new TunnelConfigurationApplication();
		this.tunnelProviderApplication = new TunnelProviderApplication();
	}
	/**
	 * Devuelve la lista de tuneles activo
	 * @param apiToken | Token de conexión con la API
	 * @returns | Promise con el resultado o error del proceso
	 */
	getTunnels(apiToken: string): Promise<responseTunnelRepoArray> {
		return this.tunnelApplication.getTunnels(apiToken);
	}
	/**
	 * Devuelve el contenido para el fichero que lanza el tunnel para docker
	 * @param host | Host donde hay que hacer el tunnel
	 * @param configuration | Configuración del tunel
	 * @returns String con el contenido a guardar en el fichero
	 */
	getContentLaunchTunnelDocker(
		host: string,
		configuration: TunnelConfiguration
	): string {
		return this.tunnelApplication.getContentLaunchTunnelDocker(
			host,
			configuration
		);
	}
	/**
	 * Devuelve el contenido para el fichero que lanza el tunnel para ejecutable
	 * @param host | Host donde hay que hacer el tunnel
	 * @param configuration | Configuración del tunel
	 * @returns String con el contenido a guardar en el fichero
	 */
	getContentLaunchTunnelExe(
		host: string,
		configuration: TunnelConfiguration
	): string {
		return this.tunnelApplication.getContentLaunchTunnelExe(
			host,
			configuration
		);
	}
	/**
	 * Devuelve la configuración del tunel del usuario
	 * @param user | Usuario
	 * @returns | Promise con el resultado o error del proceso
	 */
	getConfiguration(user: string): Promise<responseTunnelConfigRepo> {
		return this.tunnelConfApplication.getConfiguration(user);
	}
	/**
	 * Actualización de la configuración para el tunel
	 * @param configuration | Actualiza la configuración del tunel
	 * @returns | Promise con el resultado o error del proceso
	 */
	async editConfiguration(
		configuration: TunnelConfiguration
	): Promise<responseTunnelConfigRepo> {
		return this.tunnelConfApplication.editConfiguration(configuration);
	}

	async getProviders(): Promise<responseTunnelProviderRepoArray> {
		return this.tunnelProviderApplication.getProviders();
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
		return this.tunnelApplication.getTunnelURLFromHost(host, apiToken);
	}
	/**
	 * Descarga del fichero por lotes para poder lanzar el tunel en docker
	 * @param systemName | Nombre del sistema
	 * @param host | Host
	 * @param tunnelConfiguration | Configuración del tunel
	 */
	downloadLaunchTunnelConnectionDocker(
		systemName: string,
		host: string,
		tunnelConfiguration: TunnelConfiguration
	): void {
		let content = this.getContentLaunchTunnelDocker(host, tunnelConfiguration);
		FileAs.save(
			"text/plain",
			`tunnel_docker_${systemName.toUpperCase()}.bat`,
			content
		);
	}
	/**
	 * Descarga del fichero por lotes para poder lanzar el tunel el ejecutable
	 * @param systemName | Nombre del sistema
	 * @param host | Host
	 * @param tunnelConfiguration | Configuración del tunel
	 */
	downloadLaunchTunnelConnectionExe(
		systemName: string,
		host: string,
		tunnelConfiguration: TunnelConfiguration
	): void {
		let content = this.getContentLaunchTunnelExe(host, tunnelConfiguration);
		FileAs.save(
			"text/plain",
			`tunnel_exe_${systemName.toUpperCase()}.bat`,
			content
		);
	}
}
