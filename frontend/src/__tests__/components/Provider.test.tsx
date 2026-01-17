import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "../../components/ui/provider";

// 🔥 mock next-themes (ColorModeProvider ke liye)
jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("Provider", () => {
  test("renders children correctly", () => {
    render(
      <Provider>
        <div>App Content</div>
      </Provider>
    );

    expect(screen.getByText("App Content")).toBeInTheDocument();
  });

  test("wraps content successfully without crashing", () => {
    render(
      <Provider>
        <span>Wrapped</span>
      </Provider>
    );

    expect(screen.getByText("Wrapped")).toBeInTheDocument();
  });
});
