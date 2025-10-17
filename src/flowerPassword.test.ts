import { describe, it, expect } from "vitest";
import { fpCode, fpCodeSync } from "./flowerPassword";

describe("fpCode (async)", () => {
  describe("Basic functionality", () => {
    it("should generate password with default length 16", async () => {
      const result = await fpCode("password", "key");
      expect(result).toBe("K3A2a66Bf88b628c");
    });

    it("should generate consistent passwords for same inputs", async () => {
      const result1 = await fpCode("password", "key", 16);
      const result2 = await fpCode("password", "key", 16);
      expect(result1).toBe(result2);
    });

    it("should generate different passwords for different passwords", async () => {
      const result1 = await fpCode("password1", "key", 16);
      const result2 = await fpCode("password2", "key", 16);
      expect(result1).not.toBe(result2);
    });

    it("should generate different passwords for different keys", async () => {
      const result1 = await fpCode("password", "key1", 16);
      const result2 = await fpCode("password", "key2", 16);
      expect(result1).not.toBe(result2);
    });
  });

  describe("Length validation", () => {
    it.each([
      { length: 2, expected: "K3" },
      { length: 8, expected: "K3A2a66B" },
      { length: 16, expected: "K3A2a66Bf88b628c" },
      { length: 24, expected: "K3A2a66Bf88b628c2Cd7cDA9" },
      { length: 32, expected: "K3A2a66Bf88b628c2Cd7cDA9958f6b26" },
    ])("should generate password with length $length", async ({ length, expected }) => {
      const result = await fpCode("password", "key", length);
      expect(result).toBe(expected);
    });
  });

  describe("First character requirement", () => {
    it.each([
      { password: "password", key: "key", expected: "K3A2a66Bf88b628c" },
      { password: "test", key: "example.com", expected: "B0399e643E07a2EA" },
      { password: "mypass", key: "github.com", expected: "K5817EB58CE4512F" },
      { password: "secret", key: "google.com", expected: "Kc6813f75AAa6Bd1" },
      { password: "12345", key: "site", expected: "K05a62bfea0C1553" },
    ])("should start with letter for password='$password', key='$key'", async ({ password, key, expected }) => {
      const result = await fpCode(password, key, 16);
      expect(result).toBe(expected);
      expect(result[0]).toMatch(/[a-zA-Z]/);
    });
  });

  describe("Character composition", () => {
    it("should contain alphanumeric characters", async () => {
      const result = await fpCode("password", "key", 16);
      expect(result).toBe("K3A2a66Bf88b628c");
      expect(result).toMatch(/^[a-zA-Z0-9]+$/);
    });

    it("should contain mixed case letters", async () => {
      // Test with known values that contain mixed case
      const result1 = await fpCode("password", "key", 32);
      expect(result1).toBe("K3A2a66Bf88b628c2Cd7cDA9958f6b26");
      expect(result1).toMatch(/[A-Z]/); // Has uppercase
      expect(result1).toMatch(/[a-z]/); // Has lowercase
    });
  });

  describe("Real-world examples", () => {
    it.each([
      { password: "password", key: "key", length: 16, expected: "K3A2a66Bf88b628c" },
      { password: "test", key: "github.com", length: 16, expected: "D04175F7A9c7Ab4a" },
      { password: "mypassword", key: "example.com", length: 12, expected: "K0CA12CecFFB" },
    ])("should generate '$expected' for password='$password', key='$key', length=$length", async ({ password, key, length, expected }) => {
      const result = await fpCode(password, key, length);
      expect(result).toBe(expected);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty password string", async () => {
      const result = await fpCode("", "key", 16);
      expect(result).toBe("K46eB52c968caeAa");
    });

    it("should handle empty key string", async () => {
      const result = await fpCode("password", "", 16);
      expect(result).toBe("eB3b1cA3D6B54c00");
    });

    it("should handle both empty strings", async () => {
      const result = await fpCode("", "", 16);
      expect(result).toBe("K930B0264e62DDFC");
    });

    it("should handle special characters in password", async () => {
      const result = await fpCode("p@ssw0rd!#$%", "key", 16);
      expect(result).toBe("D4e5c2BE16F71498");
    });

    it("should handle special characters in key", async () => {
      const result = await fpCode("password", "user@example.com", 16);
      expect(result).toBe("K98076292B62A974");
    });

    it("should handle unicode characters", async () => {
      const result = await fpCode("密码", "网站.com", 16);
      expect(result).toBe("KFF7FEa7928bAAAa");
    });

    it("should handle very long password", async () => {
      const longPassword = "a".repeat(1000);
      const result = await fpCode(longPassword, "key", 16);
      expect(result).toBe("K2775CF7c646a718");
    });

    it("should handle very long key", async () => {
      const longKey = "b".repeat(1000);
      const result = await fpCode("password", longKey, 16);
      expect(result).toBe("K77E3F873Aa8a01f");
    });
  });

  describe("Type safety", () => {
    it("should accept all valid length types", async () => {
      const expectedByLength: Record<number, string> = {
        2: "K3",
        3: "K3A",
        4: "K3A2",
        5: "K3A2a",
        6: "K3A2a6",
        7: "K3A2a66",
        8: "K3A2a66B",
        9: "K3A2a66Bf",
        10: "K3A2a66Bf8",
        11: "K3A2a66Bf88",
        12: "K3A2a66Bf88b",
        13: "K3A2a66Bf88b6",
        14: "K3A2a66Bf88b62",
        15: "K3A2a66Bf88b628",
        16: "K3A2a66Bf88b628c",
        17: "K3A2a66Bf88b628c2",
        18: "K3A2a66Bf88b628c2C",
        19: "K3A2a66Bf88b628c2Cd",
        20: "K3A2a66Bf88b628c2Cd7",
        21: "K3A2a66Bf88b628c2Cd7c",
        22: "K3A2a66Bf88b628c2Cd7cD",
        23: "K3A2a66Bf88b628c2Cd7cDA",
        24: "K3A2a66Bf88b628c2Cd7cDA9",
        25: "K3A2a66Bf88b628c2Cd7cDA99",
        26: "K3A2a66Bf88b628c2Cd7cDA995",
        27: "K3A2a66Bf88b628c2Cd7cDA9958",
        28: "K3A2a66Bf88b628c2Cd7cDA9958f",
        29: "K3A2a66Bf88b628c2Cd7cDA9958f6",
        30: "K3A2a66Bf88b628c2Cd7cDA9958f6b",
        31: "K3A2a66Bf88b628c2Cd7cDA9958f6b2",
        32: "K3A2a66Bf88b628c2Cd7cDA9958f6b26",
      };

      const lengths = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32] as const;

      for (const length of lengths) {
        const result = await fpCode("password", "key", length);
        expect(result).toBe(expectedByLength[length]);
      }
    });
  });

  describe("Length validation errors", () => {
    it.each([
      { length: 1, error: "Length must be between 2 and 32, got: 1" },
      { length: 0, error: "Length must be between 2 and 32, got: 0" },
      { length: -1, error: "Length must be between 2 and 32, got: -1" },
      { length: 33, error: "Length must be between 2 and 32, got: 33" },
      { length: 100, error: "Length must be between 2 and 32, got: 100" },
    ])("should throw error for out-of-range length $length", async ({ length, error }) => {
      await expect(fpCode("password", "key", length)).rejects.toThrow(error);
    });

    it.each([
      { length: 16.5, error: "Length must be an integer, got: 16.5" },
      { length: 3.14, error: "Length must be an integer, got: 3.14" },
      { length: Infinity, error: "Length must be an integer, got: Infinity" },
      { length: -Infinity, error: "Length must be an integer, got: -Infinity" },
    ])("should throw error for non-integer length $length", async ({ length, error }) => {
      await expect(fpCode("password", "key", length)).rejects.toThrow(error);
    });

    it("should throw error for NaN", async () => {
      await expect(fpCode("password", "key", NaN)).rejects.toThrow("Length must be an integer");
    });
  });
});

describe("fpCodeSync (Node.js only)", () => {
  describe("Basic functionality", () => {
    it("should generate password with default length 16", () => {
      const result = fpCodeSync("password", "key");
      expect(result).toBe("K3A2a66Bf88b628c");
    });

    it("should generate consistent passwords for same inputs", () => {
      const result1 = fpCodeSync("password", "key", 16);
      const result2 = fpCodeSync("password", "key", 16);
      expect(result1).toBe(result2);
      expect(result1).toBe("K3A2a66Bf88b628c");
    });

    it("should match async version results", async () => {
      const asyncResult = await fpCode("password", "key", 16);
      const syncResult = fpCodeSync("password", "key", 16);
      expect(syncResult).toBe(asyncResult);
      expect(syncResult).toBe("K3A2a66Bf88b628c");
    });
  });

  describe("Real-world examples", () => {
    it.each([
      { password: "password", key: "key", length: 16, expected: "K3A2a66Bf88b628c" },
      { password: "test", key: "github.com", length: 16, expected: "D04175F7A9c7Ab4a" },
      { password: "mypassword", key: "example.com", length: 12, expected: "K0CA12CecFFB" },
    ])("should generate '$expected' for password='$password', key='$key', length=$length", ({ password, key, length, expected }) => {
      const result = fpCodeSync(password, key, length);
      expect(result).toBe(expected);
    });
  });

  describe("Length validation errors", () => {
    it.each([
      { length: 1, error: "Length must be between 2 and 32, got: 1" },
      { length: 33, error: "Length must be between 2 and 32, got: 33" },
      { length: 16.5, error: "Length must be an integer, got: 16.5" },
    ])("should throw error for invalid length $length", ({ length, error }) => {
      expect(() => fpCodeSync("password", "key", length)).toThrow(error);
    });
  });
});
