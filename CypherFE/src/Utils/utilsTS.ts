import CryptoJS from 'crypto-js';

/**
 * Encrypts a message using AES encryption.
 * @param message The message to be encrypted.
 * @param key The secret key used for encryption.
 * @returns The encrypted message.
 */
export const encryptMessage = (message: string, key: string): string => {
  return CryptoJS.AES.encrypt(message, key).toString();
};

/**
 * Decrypts an encrypted message using AES decryption.
 * @param ciphertext The encrypted message.
 * @param key The secret key used for decryption.
 * @returns The decrypted message.
 */
export const decryptMessage = (ciphertext: string, key: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return ciphertext;
  }
};
