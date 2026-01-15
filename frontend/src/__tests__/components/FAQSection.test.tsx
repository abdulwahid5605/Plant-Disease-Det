import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import FAQSection from "../../components/ui/FAQSection";

/* ------------------------------------------------------------------ */
/* 🔥 MOCK DATA (VERY IMPORTANT) */
/* ------------------------------------------------------------------ */
jest.mock("../../../data", () => ({
  faqItems: [
    {
      value: "a",
      title: "What is plant disease?",
      text: "Plant disease is an abnormal condition.",
    },
    {
      value: "b",
      title: "How to prevent plant disease?",
      text: "Use healthy seeds and proper care.",
    },
  ],
}));

/* ------------------------------------------------------------------ */
/* 🔥 MOCK CHAKRA ACCORDION (ONLY ONCE) */
/* ------------------------------------------------------------------ */
jest.mock("@chakra-ui/react", () => {
  const actual = jest.requireActual("@chakra-ui/react");

  return {
    ...actual,
    Accordion: {
      Root: ({ children }: any) => <div>{children}</div>,
      Item: ({ children }: any) => <div>{children}</div>,
      ItemTrigger: ({ children }: any) => <button>{children}</button>,
      ItemContent: ({ children }: any) => <div>{children}</div>,
      ItemIndicator: () => <span data-testid="indicator" />,
    },
  };
});

/* ------------------------------------------------------------------ */
/* ✅ TESTS */
/* ------------------------------------------------------------------ */
describe("FAQSection", () => {
  test("renders main heading", () => {
    render(<FAQSection />);

    expect(
      screen.getByRole("heading", {
        name: /frequently asked questions/i,
      })
    ).toBeInTheDocument();
  });

  test("renders FAQ questions", () => {
    render(<FAQSection />);

    expect(
      screen.getByText("What is plant disease?")
    ).toBeInTheDocument();

    expect(
      screen.getByText("How to prevent plant disease?")
    ).toBeInTheDocument();
  });

  test("renders FAQ answers", () => {
    render(<FAQSection />);

    expect(
      screen.getByText("Plant disease is an abnormal condition.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Use healthy seeds and proper care.")
    ).toBeInTheDocument();
  });

  test("renders side help box", () => {
    render(<FAQSection />);

    expect(
      screen.getByRole("heading", { name: /need more help/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/explore our tutorials/i)
    ).toBeInTheDocument();
  });

  test("renders Go to Resources button", () => {
    render(<FAQSection />);

    expect(
      screen.getByRole("button", {
        name: /go to resources/i,
      })
    ).toBeInTheDocument();
  });
});
