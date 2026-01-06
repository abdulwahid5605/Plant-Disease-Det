import * as React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { renderWithChakra } from "../../test-utils";
import ArticlesPage from "../../pages/Articles";

// mock data used inside Articles page
jest.mock("../../../data.tsx", () => ({
  __esModule: true,
  default: {
    articles: [
      {
        id: 1,
        title: "Leaf Disease Detection",
        excerpt: "Detect plant leaf diseases using AI",
        image: "/test-image.jpg",
      },
    ],
    faqItems: [
      {
        value: "a",
        title: "How does AI work?",
        text: "AI analyzes plant images",
      },
    ],
  },
}));

const renderPage = () =>
  renderWithChakra(
    <MemoryRouter>
      <ArticlesPage />
    </MemoryRouter>
  );

describe("Articles Page", () => {
  test("renders hero heading", () => {
    renderPage();

    expect(
      screen.getByText(/Welcome to Plant Disease Detection System With AI/i)
    ).toBeInTheDocument();
  });

  test("renders latest articles section", () => {
    renderPage();

    expect(screen.getByText("Latest Articles")).toBeInTheDocument();
    expect(screen.getByText("Leaf Disease Detection")).toBeInTheDocument();
    expect(
      screen.getByText("Detect plant leaf diseases using AI")
    ).toBeInTheDocument();
  });

  test("renders Read More button for article", () => {
    renderPage();

    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  test("renders FAQ section", () => {
    renderPage();

    expect(
      screen.getByText("Frequently Asked Questions")
    ).toBeInTheDocument();
    expect(
      screen.getByText("How does AI work?")
    ).toBeInTheDocument();
  });

  test("renders Need More Help section", () => {
    renderPage();

    expect(screen.getByText("Need More Help?")).toBeInTheDocument();
    expect(
      screen.getByText(/Explore our tutorials, guides/i)
    ).toBeInTheDocument();
  });

  test("renders Connect With Us section", () => {
    renderPage();

    expect(screen.getByText("Connect With Us")).toBeInTheDocument();
    expect(screen.getByText("Facebook")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });
});
