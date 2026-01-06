import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithChakra } from "../../test-utils";
import {
  ColorModeButton,
  ColorModeIcon,
  ColorModeProvider,
  DarkMode,
  LightMode,
  useColorMode,
  useColorModeValue,
} from "../../components/ui/color-mode";
import { jest } from "@jest/globals";

// mock next-themes so tests don’t depend on real theme logic
const setThemeMock = jest.fn();

jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: () => ({
    resolvedTheme: "light",
    forcedTheme: null,
    setTheme: setThemeMock,
  }),
}));

describe("color-mode", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // provider should render its children
  test("ColorModeProvider renders children", () => {
    renderWithChakra(
      <ColorModeProvider>
        <div>Child</div>
      </ColorModeProvider>
    );
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  // icon should render based on color mode
  test("ColorModeIcon renders", () => {
    renderWithChakra(<ColorModeIcon />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  // hook should return light value in light mode
  test("useColorModeValue returns light value", () => {
    const Comp = () => <span>{useColorModeValue("LIGHT", "DARK")}</span>;
    renderWithChakra(<Comp />);
    expect(screen.getByText("LIGHT")).toBeInTheDocument();
  });

  // toggleColorMode should call setTheme
  test("useColorMode toggle works", () => {
    const Comp = () => {
      const { toggleColorMode } = useColorMode();
      return <button onClick={toggleColorMode}>toggle</button>;
    };
    renderWithChakra(<Comp />);
    fireEvent.click(screen.getByText("toggle"));
    expect(setThemeMock).toHaveBeenCalled();
  });

  // light mode wrapper renders correctly
  test("LightMode renders", () => {
    renderWithChakra(<LightMode>Light</LightMode>);
    expect(screen.getByText("Light")).toHaveClass("chakra-theme");
  });

  // dark mode wrapper renders correctly
  test("DarkMode renders", () => {
    renderWithChakra(<DarkMode>Dark</DarkMode>);
    expect(screen.getByText("Dark")).toHaveClass("chakra-theme");
  });
});
