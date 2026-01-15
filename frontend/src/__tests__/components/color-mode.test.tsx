import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import {
  ColorModeProvider,
  useColorMode,
  useColorModeValue,
  ColorModeIcon,
  ColorModeButton,
  LightMode,
  DarkMode,
} from "../../components/ui/color-mode";

/* ------------------------------------------------------------------ */
/* 🔥 MOCK next-themes (MOST IMPORTANT PART) */
/* ------------------------------------------------------------------ */
jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: any) => <div>{children}</div>,
  useTheme: () => ({
    resolvedTheme: "light",
    forcedTheme: null,
    setTheme: jest.fn(),
  }),
}));

/* ------------------------------------------------------------------ */
/* TEST HELPERS */
/* ------------------------------------------------------------------ */
function TestUseColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <span data-testid="mode">{colorMode}</span>
      <button onClick={toggleColorMode}>toggle</button>
    </>
  );
}

function TestUseColorModeValue() {
  const value = useColorModeValue("LIGHT", "DARK");
  return <span>{value}</span>;
}

/* ------------------------------------------------------------------ */
/* TESTS */
/* ------------------------------------------------------------------ */
describe("Color mode utilities", () => {
  test("ColorModeProvider renders children", () => {
    render(
      <ColorModeProvider>
        <div>App</div>
      </ColorModeProvider>
    );

    expect(screen.getByText("App")).toBeInTheDocument();
  });

  test("useColorMode returns light mode by default", () => {
    render(<TestUseColorMode />);

    expect(screen.getByTestId("mode")).toHaveTextContent("light");
  });

  test("useColorModeValue returns light value when theme is light", () => {
    render(<TestUseColorModeValue />);

    expect(screen.getByText("LIGHT")).toBeInTheDocument();
  });

  test("ColorModeIcon renders sun icon in light mode", () => {
    render(<ColorModeIcon />);

    // react-icons render svg
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  test("ColorModeButton renders and is clickable", () => {
    render(<ColorModeButton />);

    const btn = screen.getByRole("button", {
      name: /toggle color mode/i,
    });

    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);
  });

  test("LightMode renders children", () => {
    render(
      <LightMode>
        <span>Light Content</span>
      </LightMode>
    );

    expect(screen.getByText("Light Content")).toBeInTheDocument();
  });

  test("DarkMode renders children", () => {
    render(
      <DarkMode>
        <span>Dark Content</span>
      </DarkMode>
    );

    expect(screen.getByText("Dark Content")).toBeInTheDocument();
  });
});
