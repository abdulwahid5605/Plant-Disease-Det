import * as React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ArticlesPage from "../../pages/Articles";
import { renderWithProviders } from "../../../test-utils";

/* ------------------------------------------------------------------ */
/* MOCK child UI components */
/* ------------------------------------------------------------------ */
jest.mock("../../components/ui/HeroSection", () => () => (
  <div data-testid="hero-section">HeroSection</div>
));

jest.mock("../../components/ui/InfoSection", () => () => (
  <div data-testid="info-section">InfoSection</div>
));

jest.mock("../../components/ui/ArticlesSection", () => () => (
  <div data-testid="articles-section">ArticlesSection</div>
));

jest.mock("../../components/ui/FAQSection", () => () => (
  <div data-testid="faq-section">FAQSection</div>
));

jest.mock("../../components/ui/SocialConnect", () => () => (
  <div data-testid="social-connect">SocialConnect</div>
));

/* ------------------------------------------------------------------ */
/* MOCK data.tsx */
/* ------------------------------------------------------------------ */
jest.mock("../../../data.tsx", () => ({
  __esModule: true,
  default: {
    articles: [
      { id: 1, title: "Test Article 1" },
      { id: 2, title: "Test Article 2" },
    ],
  },
}));

describe("ArticlesPage", () => {
  test("renders hero section", () => {
    renderWithProviders(<ArticlesPage />);
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });

  test("renders info section", () => {
    renderWithProviders(<ArticlesPage />);
    expect(screen.getByTestId("info-section")).toBeInTheDocument();
  });

  test("renders articles section", () => {
    renderWithProviders(<ArticlesPage />);
    expect(screen.getByTestId("articles-section")).toBeInTheDocument();
  });

  test("renders Ready to Start CTA", () => {
    renderWithProviders(<ArticlesPage />);

    expect(
      screen.getByRole("heading", { name: /ready to start/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /upload your plant now/i })
    ).toBeInTheDocument();
  });

  test("renders FAQ and SocialConnect sections", () => {
    renderWithProviders(<ArticlesPage />);

    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    expect(screen.getByTestId("social-connect")).toBeInTheDocument();
  });
});
