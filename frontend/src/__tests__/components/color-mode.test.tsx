import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../test-utils";

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
/* 🔥 MOCK next-themes */
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
    renderWithProviders(
      <ColorModeProvider>
        <div>App</div>
      </ColorModeProvider>
    );

    expect(screen.getByText("App")).toBeInTheDocument();
  });

  test("useColorMode returns light mode by default", () => {
    renderWithProviders(<TestUseColorMode />);

    expect(screen.getByTestId("mode")).toHaveTextContent("light");
  });

  test("useColorModeValue returns light value when theme is light", () => {
    renderWithProviders(<TestUseColorModeValue />);

    expect(screen.getByText("LIGHT")).toBeInTheDocument();
  });

  test("ColorModeIcon renders icon", () => {
    renderWithProviders(<ColorModeIcon />);

    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  test("ColorModeButton renders and is clickable", () => {
    renderWithProviders(<ColorModeButton />);

    const btn = screen.getByRole("button", {
      name: /toggle color mode/i,
    });

    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
  });

  test("LightMode renders children", () => {
    renderWithProviders(
      <LightMode>
        <span>Light Content</span>
      </LightMode>
    );

    expect(screen.getByText("Light Content")).toBeInTheDocument();
  });

  test("DarkMode renders children", () => {
    renderWithProviders(
      <DarkMode>
        <span>Dark Content</span>
      </DarkMode>
    );

    expect(screen.getByText("Dark Content")).toBeInTheDocument();
  });
});
