import * as React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../test-utils";
import FAQSection from "../../components/ui/FAQSection";

/* ------------------------------------------------------------------ */
/* 🔥 MOCK DATA (SAFE) */
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

describe("FAQSection", () => {
  test("renders main heading", () => {
    renderWithProviders(<FAQSection />);

    expect(
      screen.getByRole("heading", {
        name: /frequently asked questions/i,
      })
    ).toBeInTheDocument();
  });

  test("renders FAQ questions", () => {
    renderWithProviders(<FAQSection />);

    expect(
      screen.getByText("What is plant disease?")
    ).toBeInTheDocument();

    expect(
      screen.getByText("How to prevent plant disease?")
    ).toBeInTheDocument();
  });

  test("renders FAQ answers", () => {
    renderWithProviders(<FAQSection />);

    expect(
      screen.getByText("Plant disease is an abnormal condition.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Use healthy seeds and proper care.")
    ).toBeInTheDocument();
  });

  test("renders side help box", () => {
    renderWithProviders(<FAQSection />);

    expect(
      screen.getByRole("heading", { name: /need more help/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/explore our tutorials/i)
    ).toBeInTheDocument();
  });

  test("renders Go to Resources button", () => {
    renderWithProviders(<FAQSection />);

    expect(
      screen.getByRole("button", {
        name: /go to resources/i,
      })
    ).toBeInTheDocument();
  });
});
