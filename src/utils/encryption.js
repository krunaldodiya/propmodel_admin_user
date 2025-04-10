import crypto from "crypto";

// Constants for encryption
const IV_LENGTH = 16;
const SALT = "propmodel-salt";
const KEY_LENGTH = 32;
const ALGORITHM = "aes-256-cbc";

// Create a 32-byte key from the provided key with proper error handling
const getEncryptionKey = () => {
  try {
    const key = process.env.ENCRYPTION_KEY;
    return crypto.scryptSync(key, SALT, KEY_LENGTH);
  } catch (error) {
    console.error("Error generating encryption key:", error.message);
    throw new Error("Failed to initialize encryption key");
  }
};

const ENCRYPTION_KEY = getEncryptionKey();

/**
 * Encrypts a UUID using AES-256-CBC encryption
 * @param {string} uuid - The UUID to encrypt
 * @returns {string} The encrypted UUID in format 'iv:encrypted'
 * @throws {Error} If encryption fails or input is invalid
 */
const encryptUUID = (uuid) => {
  try {
    if (!uuid || typeof uuid !== "string") {
      throw new Error("Invalid UUID input");
    }

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);

    let encrypted = cipher.update(uuid);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
  } catch (error) {
    console.error("Encryption error:", error.message);
    throw new Error("Failed to encrypt UUID");
  }
};

/**
 * Decrypts an encrypted UUID
 * @param {string} encryptedUUID - The encrypted UUID in format 'iv:encrypted'
 * @returns {string} The decrypted UUID
 * @throws {Error} If decryption fails or input is invalid
 */
const decryptUUID = (encryptedUUID) => {
  try {
    if (!encryptedUUID || typeof encryptedUUID !== "string") {
      throw new Error("Invalid encrypted UUID input");
    }

    const [ivHex, encryptedHex] = encryptedUUID.split(":");
    if (!ivHex || !encryptedHex) {
      throw new Error("Invalid encrypted UUID format");
    }

    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);

    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  } catch (error) {
    console.error("Decryption error:", error.message);
    throw new Error("Failed to decrypt UUID");
  }
};

export { encryptUUID, decryptUUID };
