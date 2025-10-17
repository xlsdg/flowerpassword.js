import { describe, it, expect } from "vitest";
import fpCode from "./flowerpassword";

describe("fpCode", () => {
  describe("Basic functionality", () => {
    it("should generate password with default length 16", () => {
      const result = fpCode("password", "key");
      expect(result).toHaveLength(16);
      expect(typeof result).toBe("string");
    });

    it("should generate consistent passwords for same inputs", () => {
      const result1 = fpCode("password", "key", 16);
      const result2 = fpCode("password", "key", 16);
      expect(result1).toBe(result2);
    });

    it("should generate different passwords for different passwords", () => {
      const result1 = fpCode("password1", "key", 16);
      const result2 = fpCode("password2", "key", 16);
      expect(result1).not.toBe(result2);
    });

    it("should generate different passwords for different keys", () => {
      const result1 = fpCode("password", "key1", 16);
      const result2 = fpCode("password", "key2", 16);
      expect(result1).not.toBe(result2);
    });
  });

  describe("Length validation", () => {
    it("should generate password with length 2", () => {
      const result = fpCode("password", "key", 2);
      expect(result).toHaveLength(2);
    });

    it("should generate password with length 8", () => {
      const result = fpCode("password", "key", 8);
      expect(result).toHaveLength(8);
    });

    it("should generate password with length 16", () => {
      const result = fpCode("password", "key", 16);
      expect(result).toHaveLength(16);
    });

    it("should generate password with length 24", () => {
      const result = fpCode("password", "key", 24);
      expect(result).toHaveLength(24);
    });

    it("should generate password with length 32", () => {
      const result = fpCode("password", "key", 32);
      expect(result).toHaveLength(32);
    });
  });

  describe("First character requirement", () => {
    it("should always start with a letter (not a number)", () => {
      // Test multiple combinations to ensure first character is always a letter
      const testCases = [
        { password: "password", key: "key" },
        { password: "test", key: "example.com" },
        { password: "mypass", key: "github.com" },
        { password: "secret", key: "google.com" },
        { password: "12345", key: "site" },
      ];

      testCases.forEach(({ password, key }) => {
        const result = fpCode(password, key, 16);
        const firstChar = result[0];
        expect(firstChar).toMatch(/[a-zA-Z]/);
      });
    });
  });

  describe("Character composition", () => {
    it("should contain alphanumeric characters", () => {
      const result = fpCode("password", "key", 16);
      expect(result).toMatch(/^[a-zA-Z0-9]+$/);
    });

    it("should contain mixed case letters", () => {
      // Test multiple inputs to increase likelihood of mixed case
      const results = [
        fpCode("password", "key", 32),
        fpCode("test", "example", 32),
        fpCode("hello", "world", 32),
      ];

      const hasUpperCase = results.some((r) => /[A-Z]/.test(r));
      const hasLowerCase = results.some((r) => /[a-z]/.test(r));

      expect(hasUpperCase).toBe(true);
      expect(hasLowerCase).toBe(true);
    });
  });

  describe("Real-world examples", () => {
    it("should generate expected password for known inputs", () => {
      // These are test vectors that can be used to verify algorithm consistency
      const result1 = fpCode("password", "key", 16);
      expect(result1).toBe("K3A2a66Bf88b628c");

      const result2 = fpCode("test", "github.com", 16);
      expect(result2).toBe("D04175F7A9c7Ab4a");

      const result3 = fpCode("mypassword", "example.com", 12);
      expect(result3).toBe("K0CA12CecFFB");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty password string", () => {
      const result = fpCode("", "key", 16);
      expect(result).toHaveLength(16);
      expect(typeof result).toBe("string");
    });

    it("should handle empty key string", () => {
      const result = fpCode("password", "", 16);
      expect(result).toHaveLength(16);
      expect(typeof result).toBe("string");
    });

    it("should handle both empty strings", () => {
      const result = fpCode("", "", 16);
      expect(result).toHaveLength(16);
      expect(typeof result).toBe("string");
    });

    it("should handle special characters in password", () => {
      const result = fpCode("p@ssw0rd!#$%", "key", 16);
      expect(result).toHaveLength(16);
      expect(typeof result).toBe("string");
    });

    it("should handle special characters in key", () => {
      const result = fpCode("password", "user@example.com", 16);
      expect(result).toHaveLength(16);
      expect(typeof result).toBe("string");
    });

    it("should handle unicode characters", () => {
      const result = fpCode("密码", "网站.com", 16);
      expect(result).toHaveLength(16);
      expect(typeof result).toBe("string");
    });

    it("should handle very long password", () => {
      const longPassword = "a".repeat(1000);
      const result = fpCode(longPassword, "key", 16);
      expect(result).toHaveLength(16);
      expect(typeof result).toBe("string");
    });

    it("should handle very long key", () => {
      const longKey = "b".repeat(1000);
      const result = fpCode("password", longKey, 16);
      expect(result).toHaveLength(16);
      expect(typeof result).toBe("string");
    });
  });

  describe("Type safety", () => {
    it("should accept all valid length types", () => {
      const lengths = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32] as const;

      lengths.forEach((length) => {
        const result = fpCode("password", "key", length);
        expect(result).toHaveLength(length);
      });
    });
  });

  describe("Length validation errors", () => {
    it("should throw error for length less than 2", () => {
      expect(() => fpCode("password", "key", 1)).toThrow("Length must be between 2 and 32, got: 1");
      expect(() => fpCode("password", "key", 0)).toThrow("Length must be between 2 and 32, got: 0");
      expect(() => fpCode("password", "key", -1)).toThrow("Length must be between 2 and 32, got: -1");
    });

    it("should throw error for length greater than 32", () => {
      expect(() => fpCode("password", "key", 33)).toThrow("Length must be between 2 and 32, got: 33");
      expect(() => fpCode("password", "key", 100)).toThrow("Length must be between 2 and 32, got: 100");
    });

    it("should throw error for non-integer length", () => {
      expect(() => fpCode("password", "key", 16.5)).toThrow("Length must be an integer, got: 16.5");
      expect(() => fpCode("password", "key", 3.14)).toThrow("Length must be an integer, got: 3.14");
    });

    it("should throw error for NaN", () => {
      expect(() => fpCode("password", "key", NaN)).toThrow("Length must be an integer");
    });

    it("should throw error for Infinity", () => {
      expect(() => fpCode("password", "key", Infinity)).toThrow("Length must be an integer, got: Infinity");
      expect(() => fpCode("password", "key", -Infinity)).toThrow("Length must be an integer, got: -Infinity");
    });
  });
});
