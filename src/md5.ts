/**
 * Native MD5 implementation using platform-specific crypto APIs
 * Supports both Node.js (crypto module) and browsers (Web Crypto API)
 * Compatible with blueimp-md5 HMAC behavior
 */

/**
 * Convert ArrayBuffer to hexadecimal string
 */
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Check if running in Node.js environment
 */
function isNode(): boolean {
  return (
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null
  );
}

/**
 * Asynchronous MD5/HMAC-MD5 hash function (works in all environments)
 * Uses Web Crypto API in browsers and crypto module in Node.js
 *
 * Mimics blueimp-md5 behavior:
 * - md5(string) -> MD5 hash
 * - md5(string, key) -> HMAC-MD5 hash
 *
 * @param message - Message to hash
 * @param key - Optional key for HMAC-MD5
 * @returns Promise that resolves to MD5 hash as hexadecimal string
 */
export async function md5Async(message: string, key?: string): Promise<string> {
  const encoder = new TextEncoder();

  if (isNode()) {
    // Node.js environment - use crypto module
    const crypto = await import("crypto");

    if (key !== undefined) {
      // HMAC-MD5
      const hmac = crypto.createHmac("md5", key);
      hmac.update(message);
      return hmac.digest("hex");
    } else {
      // Regular MD5
      const hash = crypto.createHash("md5");
      hash.update(message);
      return hash.digest("hex");
    }
  } else {
    // Browser environment - use Web Crypto API
    if (key !== undefined) {
      // HMAC-MD5
      const keyData = encoder.encode(key);
      const messageData = encoder.encode(message);

      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "MD5" },
        false,
        ["sign"]
      );

      const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
      return bufferToHex(signature);
    } else {
      // Regular MD5
      const data = encoder.encode(message);
      const hashBuffer = await crypto.subtle.digest("MD5", data);
      return bufferToHex(hashBuffer);
    }
  }
}

/**
 * Synchronous MD5/HMAC-MD5 hash function (Node.js only)
 * Throws error if called in browser environment
 *
 * Mimics blueimp-md5 behavior:
 * - md5(string) -> MD5 hash
 * - md5(string, key) -> HMAC-MD5 hash
 *
 * @param message - Message to hash
 * @param key - Optional key for HMAC-MD5
 * @returns MD5 hash as hexadecimal string
 * @throws {Error} If called in browser environment
 */
export function md5Sync(message: string, key?: string): string {
  if (!isNode()) {
    throw new Error(
      "md5Sync is only available in Node.js environment. Use md5Async in browsers."
    );
  }

  // Use require for synchronous Node.js crypto
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const crypto = require("crypto");

  if (key !== undefined) {
    // HMAC-MD5
    const hmac = crypto.createHmac("md5", key);
    hmac.update(message);
    return hmac.digest("hex");
  } else {
    // Regular MD5
    const hash = crypto.createHash("md5");
    hash.update(message);
    return hash.digest("hex");
  }
}
