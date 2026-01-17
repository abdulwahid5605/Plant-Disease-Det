import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ArticlesPage from "../../pages/Articles";

/* ------------------------------------------------------------------ */
/* MOCK Chakra UI */
/* ------------------------------------------------------------------ */
jest.mock("@chakra-ui/react", () => ({
  Box: ({ children }: any) => <div>{children}</div>,
  Heading: ({ children }: any) => <h1>{children}</h1>,
  Button: ({ children }: any) => <button>{children}</button>,
}));

/* ------------------------------------------------------------------ */
/* MOCK data.tsx */
/* ------------------------------------------------------------------ */
jest.mock("../../../data.tsx", () => ({
  __esModule: true,
  default: {
    articles: [
      { id: 1, title: "Article One", excerpt: "Excerpt one" },
      { id: 2, title: "Article Two", excerpt: "Excerpt two" },
      { id: 3, title: "Article Three", excerpt: "Excerpt three" },
    ],
  },
}));

/* ------------------------------------------------------------------ */
/* MOCK CHILD COMPONENTS */
/* ------------------------------------------------------------------ */
jest.mock("../../components/ui/HeroSection", () => ({
  __esModule: true,
  default: ({ title, subtitle }: any) => (
    <section>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  ),
}));

jest.mock("../../components/ui/InfoSection", () => ({
  __esModule: true,
  default: ({ heading, description }: any) => (
    <section>
      <h2>{heading}</h2>
      <p>{description}</p>
    </section>
  ),
}));

jest.mock("../../components/ui/ArticlesSection", () => ({
  __esModule: true,
  default: ({ title }: any) => (
    <section>
      <h2>{title}</h2>
      <p>Articles Section</p>
    </section>
  ),
}));

jest.mock("../../components/ui/FAQSection", () => ({
  __esModule: true,
  default: () => <div>FAQ Section</div>,
}));

jest.mock("../../components/ui/SocialConnect", () => ({
  __esModule: true,
  default: () => <div>Social Connect Section</div>,
}));

/* ------------------------------------------------------------------ */
/* HELPER */
/* ------------------------------------------------------------------ */
const renderPage = () => render(<ArticlesPage />);

/* ------------------------------------------------------------------ */
/* TESTS */
/* ------------------------------------------------------------------ */
describe("ArticlesPage", () => {
  test("renders hero section with title and subtitle", () => {
    renderPage();

    expect(
      screen.getByRole("heading", {
        name: /welcome to plant disease detection system with ai/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/learn expert tips, disease prevention methods/i)
    ).toBeInTheDocument();
  });

  test("renders info section with heading and description", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: /articles & guides/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/explore our collection of informative articles/i)
    ).toBeInTheDocument();
  });

  test("renders articles section", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: /all articles/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/articles section/i)
    ).toBeInTheDocument();
  });

  test("renders CTA button", () => {
    renderPage();

    expect(
      screen.getByRole("button", { name: /upload your plant now/i })
    ).toBeInTheDocument();
  });

  test("renders FAQ section", () => {
    renderPage();

    expect(
      screen.getByText(/faq section/i)
    ).toBeInTheDocument();
  });

  test("renders Social Connect section", () => {
    renderPage();

    expect(
      screen.getByText(/social connect section/i)
    ).toBeInTheDocument();
  });
});
