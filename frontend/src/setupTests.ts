import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

(globalThis as any).TextEncoder = TextEncoder;
(globalThis as any).TextDecoder = TextDecoder;

// safe structuredClone polyfill
if (!(globalThis as any).structuredClone) {
  (globalThis as any).structuredClone = (value: any) => {
    if (value === undefined) return undefined;
    return JSON.parse(JSON.stringify(value));
  };
}
