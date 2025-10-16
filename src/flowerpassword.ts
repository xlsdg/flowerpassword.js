import MD5 from "blueimp-md5";

/**
 * Valid password length range: 2-32 characters
 */
type Length =
  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16
  | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32;

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
 * Generates a Flower Password based on master password and key
 *
 * @param password - Master password
 * @param key - Domain or service identifier
 * @param length - Output password length (2-32 characters, default: 16)
 * @returns Generated password string
 *
 * @example
 * ```typescript
 * const password = fpCode("mypassword", "github.com", 16);
 * console.log(password); // "D04175F7A9c7Ab4a"
 * ```
 */
export default function fpCode(
  password: string,
  key: string,
  length: Length = 16
): string {
  // Generate base MD5 hash from password and key
  const baseHash = MD5(password, key);

  // Generate rule and source hashes using fixed salts
  const ruleChars = MD5(baseHash, "kise").split("");
  const sourceChars = MD5(baseHash, "snow").split("");

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
