export default class DownloadFile {
  /**
   * Descarga el contenido de un fichero
   * @param fileType | Tipo de fichero
   * @param filename | Nombre del fichero
   * @param content | Contenido del fichero
   */
  static download(fileType: string, filename: string, content: string): void {
    const blob = new Blob([content], { type: fileType });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.download = filename;
    link.href = url;
    link.click();
  }
}
