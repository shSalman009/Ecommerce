import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_CRYPTO_SECRET;

// Encrypt function
const encryptData = (data) => {
  const dataString = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(dataString, secretKey).toString();
  const urlSafeEncryptedData = encodeURIComponent(encryptedData);
  return urlSafeEncryptedData;
};

// Decrypt function
const decryptData = (urlSafeEncryptedData) => {
  const encryptedData = decodeURIComponent(urlSafeEncryptedData);
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedDataString = bytes.toString(CryptoJS.enc.Utf8);
  const decryptedData = JSON.parse(decryptedDataString);
  return decryptedData;
};

export { decryptData, encryptData };
