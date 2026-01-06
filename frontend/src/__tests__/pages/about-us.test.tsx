import * as React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithChakra } from "../../test-utils";
import AboutUs from "../../pages/AboutUs";

// mock data file used inside AboutUs
jest.mock("../../../data.tsx", () => ({
  __esModule: true,
  default: {
    features: [
      {
        id: 1,
        title: "AI Detection",
        description: "Detect diseases using AI",
        icon: () => <svg data-testid="feature-icon" />,
      },
    ],
    faqItems: [
      {
        value: "a",
        title: "What is PlantApp?",
        text: "PlantApp helps detect plant diseases",
      },
    ],
  },
}));

describe("AboutUs Page", () => {
  test("renders main heading", () => {
    renderWithChakra(<AboutUs />);

    expect(
      screen.getByText(/Welcome to Plant Disease Detection System With AI/i)
    ).toBeInTheDocument();
  });

  test("renders Who We Are section", () => {
    renderWithChakra(<AboutUs />);

    expect(screen.getByText("Who We Are")).toBeInTheDocument();
    expect(
      screen.getByText(/PlantApp is a smart agriculture platform/i)
    ).toBeInTheDocument();
  });

  test("renders features section from data", () => {
    renderWithChakra(<AboutUs />);

    expect(screen.getByText("Our Features")).toBeInTheDocument();
    expect(screen.getByText("AI Detection")).toBeInTheDocument();
    expect(
      screen.getByText("Detect diseases using AI")
    ).toBeInTheDocument();
  });

  test("renders team members", () => {
    renderWithChakra(<AboutUs />);

    expect(screen.getByText("Meet the Team")).toBeInTheDocument();
    expect(screen.getByText("Ali Khan")).toBeInTheDocument();
    expect(screen.getByText("Founder & CEO")).toBeInTheDocument();
  });

  test("renders FAQ section", () => {
    renderWithChakra(<AboutUs />);

    expect(
      screen.getByText("Frequently Asked Questions")
    ).toBeInTheDocument();
    expect(
      screen.getByText("What is PlantApp?")
    ).toBeInTheDocument();
  });

  test("renders call-to-action buttons", () => {
    renderWithChakra(<AboutUs />);

    expect(screen.getByText("Scroll Down")).toBeInTheDocument();
    expect(
      screen.getByText("Upload Your Plant Now")
    ).toBeInTheDocument();
  });
});
