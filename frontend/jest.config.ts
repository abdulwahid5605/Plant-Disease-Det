import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // 🔇 TypeScript errors ko ignore karo (IMPORTANT)
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json",
      diagnostics: false,
    },
  },

  moduleNameMapper: {
    // ✅ CSS support
    "\\.(css|scss|sass)$": "identity-obj-proxy",

    // ✅ Path alias support
    "^@/(.*)$": "<rootDir>/src/$1",

    // 🔥 UI components ko mock karo (REAL FILE LOAD NA HO)
    "^@/components/ui/tooltip$": "<rootDir>/src/__mocks__/ui.tsx",
    "^@/components/ui/toaster$": "<rootDir>/src/__mocks__/ui.tsx",
    "^@/components/ui/navbar$": "<rootDir>/src/__mocks__/ui.tsx",
    "^@/components/ui/footer$": "<rootDir>/src/__mocks__/ui.tsx",
  },
};

export default config;
