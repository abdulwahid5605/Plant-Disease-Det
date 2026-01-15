import * as React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ArticlesSection from "../../components/ui/ArticlesSection";
import { renderWithProviders } from "../../../test-utils";

/* 🔥 IMPORTANT: data mock (same path as component import) */
jest.mock("../../../data", () => ({
  __esModule: true,
  default: {
    articles: [
      {
        id: "1",
        title: "Article One",
        excerpt: "Excerpt one",
        image: "/img1.jpg",
      },
      {
        id: "2",
        title: "Article Two",
        excerpt: "Excerpt two",
        image: "/img2.jpg",
      },
      {
        id: "3",
        title: "Article Three",
        excerpt: "Excerpt three",
        image: "/img3.jpg",
      },
      {
        id: "4",
        title: "Article Four",
        excerpt: "Excerpt four",
        image: "/img4.jpg",
      },
    ],
  },
}));

describe("ArticlesSection", () => {
  test("renders default heading", () => {
    renderWithProviders(<ArticlesSection />);

    expect(
      screen.getByRole("heading", { name: /latest articles/i })
    ).toBeInTheDocument();
  });

  test("renders custom title when provided", () => {
    renderWithProviders(
      <ArticlesSection title="Featured Articles" />
    );

    expect(
      screen.getByRole("heading", { name: /featured articles/i })
    ).toBeInTheDocument();
  });

  test("renders default number of articles (limit = 3)", () => {
    renderWithProviders(<ArticlesSection />);

    expect(screen.getByText("Article One")).toBeInTheDocument();
    expect(screen.getByText("Article Two")).toBeInTheDocument();
    expect(screen.getByText("Article Three")).toBeInTheDocument();

    // 4th article should NOT appear
    expect(
      screen.queryByText("Article Four")
    ).not.toBeInTheDocument();
  });

  test("respects custom limit prop", () => {
    renderWithProviders(<ArticlesSection limit={2} />);

    expect(screen.getByText("Article One")).toBeInTheDocument();
    expect(screen.getByText("Article Two")).toBeInTheDocument();
    expect(
      screen.queryByText("Article Three")
    ).not.toBeInTheDocument();
  });

  test("renders article image with correct src and alt", () => {
    renderWithProviders(<ArticlesSection limit={1} />);

    const img = screen.getByAltText("Article One");
    expect(img).toHaveAttribute("src", "/img1.jpg");
  });

  test("renders article excerpt", () => {
    renderWithProviders(<ArticlesSection limit={1} />);

    expect(
      screen.getByText("Excerpt one")
    ).toBeInTheDocument();
  });

  test("renders Read More link with correct href", () => {
    renderWithProviders(<ArticlesSection limit={1} />);

    const link = screen.getByRole("link", {
      name: /read more/i,
    });

    expect(link).toHaveAttribute("href", "/articles/1");
  });
});
