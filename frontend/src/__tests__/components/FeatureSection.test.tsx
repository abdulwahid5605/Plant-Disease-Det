import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import FeaturesSection from "../../components/ui/FeatureSection";

/* ------------------------------------------------------------------ */
/* 🔥 MOCK ICON (VERY IMPORTANT) */
/* ------------------------------------------------------------------ */
const MockIcon = () => <svg data-testid="feature-icon" />;

/* ------------------------------------------------------------------ */
/* 🔥 MOCK FEATURES DATA */
/* ------------------------------------------------------------------ */
const mockFeatures = [
  {
    id: 1,
    title: "Fast Detection",
    description: "Detect plant disease instantly",
    icon: MockIcon,
  },
  {
    id: 2,
    title: "Accurate Results",
    description: "AI powered accurate diagnosis",
    icon: MockIcon,
  },
  {
    id: 3,
    title: "Easy to Use",
    description: "Simple and user friendly interface",
    icon: MockIcon,
  },
];

/* ------------------------------------------------------------------ */
/* TESTS */
/* ------------------------------------------------------------------ */
describe("FeaturesSection", () => {
  test("renders default heading", () => {
    render(<FeaturesSection features={mockFeatures} />);

    expect(
      screen.getByRole("heading", { name: /our features/i })
    ).toBeInTheDocument();
  });

  test("renders custom heading when provided", () => {
    render(
      <FeaturesSection
        heading="Why Choose Us"
        features={mockFeatures}
      />
    );

    expect(
      screen.getByRole("heading", { name: /why choose us/i })
    ).toBeInTheDocument();
  });

  test("renders all feature titles", () => {
    render(<FeaturesSection features={mockFeatures} />);

    expect(screen.getByText("Fast Detection")).toBeInTheDocument();
    expect(screen.getByText("Accurate Results")).toBeInTheDocument();
    expect(screen.getByText("Easy to Use")).toBeInTheDocument();
  });

  test("renders all feature descriptions", () => {
    render(<FeaturesSection features={mockFeatures} />);

    expect(
      screen.getByText("Detect plant disease instantly")
    ).toBeInTheDocument();

    expect(
      screen.getByText("AI powered accurate diagnosis")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Simple and user friendly interface")
    ).toBeInTheDocument();
  });

  test("renders correct number of feature icons", () => {
    render(<FeaturesSection features={mockFeatures} />);

    const icons = screen.getAllByTestId("feature-icon");
    expect(icons).toHaveLength(mockFeatures.length);
  });
});
