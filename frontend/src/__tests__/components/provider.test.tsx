import * as React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithChakra } from "../../test-utils";
import { Provider } from "../../components/ui/provider";

// mock next-themes used inside ColorModeProvider
jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("Provider", () => {
  test("renders children correctly", () => {
    renderWithChakra(
      <Provider>
        <div>App Content</div>
      </Provider>
    );

    expect(screen.getByText("App Content")).toBeInTheDocument();
  });

  test("wraps content with Chakra and ColorMode providers", () => {
    renderWithChakra(
      <Provider>
        <span>Wrapped</span>
      </Provider>
    );

    expect(screen.getByText("Wrapped")).toBeInTheDocument();
  });
});
