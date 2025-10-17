import { md5Async, md5Sync } from "./md5";

/**
 * Minimum valid password length
 */
const MIN_LENGTH = 2;

/**
 * Maximum valid password length
 */
const MAX_LENGTH = 32;

/**
 * Magic string used for character transformation rules
 * This is part of the Flower Password algorithm specification
 */
const MAGIC_STRING = "sunlovesnow1990090127xykab";

/**
 * MD5 hash length in hexadecimal characters
 */
const MD5_HEX_LENGTH = 32;

/**
 * Validates the length parameter
 * @throws {Error} If length is not a valid integer or is outside the range 2-32
 */
function validateLength(length: number): void {
  if (!Number.isInteger(length)) {
    throw new Error(`Length must be an integer, got: ${length}`);
  }

  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(
      `Length must be between ${MIN_LENGTH} and ${MAX_LENGTH}, got: ${length}`
    );
  }
}

/**
 * Core algorithm to generate Flower Password from MD5 hashes
 */
function generatePassword(
  ruleHash: string,
  sourceHash: string,
  length: number
): string {
  const ruleChars = ruleHash.split("");
  const sourceChars = sourceHash.split("");

  // Apply transformation rules: uppercase letters based on magic string pattern
  for (let i = 0; i < MD5_HEX_LENGTH; i++) {
    const char = sourceChars[i];
    // Check if character is a letter (not a digit)
    if (isNaN(+char)) {
      // Check if rule character exists in magic string
      if (MAGIC_STRING.includes(ruleChars[i])) {
        sourceChars[i] = char.toUpperCase();
      }
    }
  }

  const transformedHash = sourceChars.join("");
  const firstChar = transformedHash[0];

  // Ensure first character is always a letter (replace with 'K' if it's a digit)
  return (isNaN(+firstChar) ? firstChar : "K") + transformedHash.slice(1, length);
}

/**
 * Generates a Flower Password based on master password and key (Async version)
 * Works in both Node.js and browser environments
 *
 * @param password - Master password
 * @param key - Domain or service identifier
 * @param length - Output password length (2-32 characters, default: 16)
 * @returns Promise that resolves to generated password string
 * @throws {Error} If length is not a valid number or is outside the range 2-32
 *
 * @example
 * ```typescript
 * import { fpCode } from 'flowerpassword.js';
 * const password = await fpCode("mypassword", "github.com", 16);
 * console.log(password); // "D04175F7A9c7Ab4a"
 * ```
 */
export async function fpCode(
  password: string,
  key: string,
  length: number = 16
): Promise<string> {
  validateLength(length);

  // Generate base MD5 hash from password and key
  const baseHash = await md5Async(password, key);

  // Generate rule and source hashes using fixed salts
  const ruleHash = await md5Async(baseHash, "kise");
  const sourceHash = await md5Async(baseHash, "snow");

  return generatePassword(ruleHash, sourceHash, length);
}

/**
 * Generates a Flower Password based on master password and key (Sync version)
 * Only works in Node.js environment
 *
 * @param password - Master password
 * @param key - Domain or service identifier
 * @param length - Output password length (2-32 characters, default: 16)
 * @returns Generated password string
 * @throws {Error} If length is not a valid number or is outside the range 2-32
 * @throws {Error} If called in browser environment
 *
 * @example
 * ```typescript
 * const password = fpCodeSync("mypassword", "github.com", 16);
 * console.log(password); // "D04175F7A9c7Ab4a"
 * ```
 */
export function fpCodeSync(
  password: string,
  key: string,
  length: number = 16
): string {
  validateLength(length);

  // Generate base MD5 hash from password and key
  const baseHash = md5Sync(password, key);

  // Generate rule and source hashes using fixed salts
  const ruleHash = md5Sync(baseHash, "kise");
  const sourceHash = md5Sync(baseHash, "snow");

  return generatePassword(ruleHash, sourceHash, length);
}
