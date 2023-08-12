import aes from 'crypto-js/aes';

export default class Encrypt {
  /**
   * Función que encripta un texto
   * @param {string} sText | Texto a cifrar
   * @returns Texto cifrado
   */
  static encryptText = (sText: string): string => {
    return aes.encrypt(
      sText,
      import.meta.env.VITE_SECRET_KEY
    ).toString();
  };
  /**
   * Descifra el texto
   * @param {string} sKey | Texto cifrado
   * @returns Texto descifrado
   */
  static decryptText(sKey: string): string {
    return aes.decrypt(
      sKey,
      import.meta.env.VITE_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
  }
}
