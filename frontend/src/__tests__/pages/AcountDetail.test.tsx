import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ArticleDetail from "../..//pages/AcountDetail";

/* ------------------------------------------------------------------ */
/* MOCK Chakra UI (IMPORTANT FIX) */
/* ------------------------------------------------------------------ */
jest.mock("@chakra-ui/react", () => ({
  Box: ({ children }: any) => <div>{children}</div>,
  Flex: ({ children }: any) => <div>{children}</div>,
  Heading: ({ children }: any) => <h1>{children}</h1>,
  Text: ({ children }: any) => <p>{children}</p>,
  Image: ({ alt }: any) => <img alt={alt} />,
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
  Card: {
    Root: ({ children }: any) => <div>{children}</div>,
    Body: ({ children }: any) => <div>{children}</div>,
  },
}));

/* ------------------------------------------------------------------ */
/* MOCK react-router-dom hooks */
/* ------------------------------------------------------------------ */
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: () => mockNavigate,
}));

/* ------------------------------------------------------------------ */
/* MOCK data.tsx */
/* ------------------------------------------------------------------ */
jest.mock("../../../data.tsx", () => ({
  __esModule: true,
  default: {
    articles: [
      {
        id: 1,
        title: "Plant Disease Basics",
        excerpt: "Learn about common plant diseases",
        image: "/test-image.jpg",
      },
    ],
  },
}));

import { useParams } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* HELPER */
/* ------------------------------------------------------------------ */
const renderPage = () =>
  render(
    <MemoryRouter>
      <ArticleDetail />
    </MemoryRouter>
  );

/* ------------------------------------------------------------------ */
/* TESTS */
/* ------------------------------------------------------------------ */
describe("ArticleDetail Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders article details when article is found", () => {
    // @ts-ignore
    useParams.mockReturnValue({ id: "1" });

    renderPage();

    expect(
      screen.getByRole("heading", { name: /plant disease basics/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/learn about common plant diseases/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: /plant disease basics/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /go back/i })
    ).toBeInTheDocument();
  });

  test("navigates back when Go Back button is clicked", () => {
    // @ts-ignore
    useParams.mockReturnValue({ id: "1" });

    renderPage();

    fireEvent.click(
      screen.getByRole("button", { name: /go back/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("shows not found state when article does not exist", () => {
    // @ts-ignore
    useParams.mockReturnValue({ id: "999" });

    renderPage();

    expect(
      screen.getByRole("heading", { name: /article not found/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /back to articles/i })
    ).toBeInTheDocument();
  });

  test("navigates to home when Back to Articles button is clicked", () => {
    // @ts-ignore
    useParams.mockReturnValue({ id: "999" });

    renderPage();

    fireEvent.click(
      screen.getByRole("button", { name: /back to articles/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
