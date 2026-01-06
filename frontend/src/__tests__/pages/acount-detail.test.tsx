import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { renderWithChakra } from "../../test-utils";
import ArticleDetail from "../../pages/AcountDetail";

// mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// mock data
jest.mock("../../../data.tsx", () => ({
  __esModule: true,
  default: {
    articles: [
      {
        id: 1,
        title: "Test Article",
        excerpt: "Test article excerpt",
        image: "/test.jpg",
      },
    ],
  },
}));

const renderPage = (route: string) =>
  renderWithChakra(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/" element={<div>Articles Page</div>} />
      </Routes>
    </MemoryRouter>
  );

describe("ArticleDetail Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders article details when article exists", () => {
    renderPage("/articles/1");

    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(
      screen.getByText("Test article excerpt")
    ).toBeInTheDocument();

    expect(
      screen.getByAltText("Test Article")
    ).toBeInTheDocument();
  });

  test("renders not found message when article does not exist", () => {
    renderPage("/articles/99");

    expect(
      screen.getByText("Article Not Found")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Back to Articles")
    ).toBeInTheDocument();
  });

  test("Back to Articles button navigates to home", () => {
    renderPage("/articles/99");

    fireEvent.click(screen.getByText("Back to Articles"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("Go Back button navigates back", () => {
    renderPage("/articles/1");

    fireEvent.click(screen.getByText("Go Back"));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
