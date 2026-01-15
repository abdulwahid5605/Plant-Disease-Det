import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tooltip } from "../../components/ui/tooltip";

/* ------------------------------------------------------------------ */
/* 🔥 MOCK CHAKRA TOOLTIP (CRITICAL) */
/* ------------------------------------------------------------------ */
jest.mock("@chakra-ui/react", () => {
  const actual = jest.requireActual("@chakra-ui/react");

  return {
    ...actual,
    Tooltip: {
      Root: ({ children }: any) => <div>{children}</div>,
      Trigger: ({ children }: any) => <div>{children}</div>,
      Positioner: ({ children }: any) => <div>{children}</div>,
      Content: React.forwardRef(
        ({ children }: any, ref: React.Ref<HTMLDivElement>) => (
          <div ref={ref}>{children}</div>
        )
      ),
      Arrow: ({ children }: any) => (
        <div data-testid="tooltip-arrow">{children}</div>
      ),
      ArrowTip: () => <span data-testid="tooltip-arrow-tip" />,
    },
    Portal: ({ children }: any) => <div>{children}</div>,
  };
});

/* ------------------------------------------------------------------ */
/* ✅ TESTS */
/* ------------------------------------------------------------------ */
describe("Tooltip", () => {
  test("renders children", () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  test("renders tooltip content", () => {
    render(
      <Tooltip content="Tooltip text">
        <span>Target</span>
      </Tooltip>
    );

    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  test("does not render tooltip when disabled", () => {
    render(
      <Tooltip content="Hidden tooltip" disabled>
        <span>Disabled</span>
      </Tooltip>
    );

    expect(screen.getByText("Disabled")).toBeInTheDocument();
    expect(
      screen.queryByText("Hidden tooltip")
    ).not.toBeInTheDocument();
  });

  test("renders arrow when showArrow is true", () => {
    render(
      <Tooltip content="With arrow" showArrow>
        <span>Arrow</span>
      </Tooltip>
    );

    expect(screen.getByTestId("tooltip-arrow")).toBeInTheDocument();
    expect(
      screen.getByTestId("tooltip-arrow-tip")
    ).toBeInTheDocument();
  });
});
