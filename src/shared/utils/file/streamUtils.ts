export default class StreamUtils {
	protected stream: ReadableStream<Uint8Array>;
	protected contentUint8: Uint8Array;
	constructor(stream: ReadableStream<Uint8Array>) {
		this.stream = stream;
		this.contentUint8 = new Uint8Array();
	}
	/**
	 * Obtención de los datos del stream
	 */
	async getStream(): Promise<string> {
		await this.readStream();

		return new TextDecoder().decode(this.contentUint8);
	}
	/**
	 * Lectura del contenido del stream en formato utf-8
	 */
	async readStream() {
		const reader = this.stream.getReader();

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			this.contentUint8 = value;
		}
	}
}
