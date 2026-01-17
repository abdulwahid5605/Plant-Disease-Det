import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "../../pages/Dashboard";

/* ------------------------------------------------------------------ */
/* MOCK Chakra UI */
/* ------------------------------------------------------------------ */
jest.mock("@chakra-ui/react", () => ({
  Box: ({ children }: any) => <div>{children}</div>,
  Heading: ({ children }: any) => <h1>{children}</h1>,
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
  Flex: ({ children }: any) => <div>{children}</div>,
  SimpleGrid: ({ children }: any) => <div>{children}</div>,
  useDisclosure: () => ({
    open: false,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  }),
}));

/* ------------------------------------------------------------------ */
/* MOCK react-router-dom */
/* ------------------------------------------------------------------ */
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

/* ------------------------------------------------------------------ */
/* MOCK axios */
/* ------------------------------------------------------------------ */
jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          _id: "1",
          title: "Plant One",
          user: { _id: "other-user" },
        },
      ],
    })
  ),
}));

/* ------------------------------------------------------------------ */
/* MOCK data.tsx */
/* ------------------------------------------------------------------ */
jest.mock("../../../data.tsx", () => ({
  __esModule: true,
  default: {
    features: [{ title: "AI Detection" }],
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
  default: ({ heading }: any) => (
    <section>
      <h2>{heading}</h2>
      <p>Info Section</p>
    </section>
  ),
}));

jest.mock("../../components/ui/FeatureSection", () => ({
  __esModule: true,
  default: () => <div>Features Section</div>,
}));

jest.mock("../../components/ui/plant-card", () => ({
  __esModule: true,
  default: ({ post }: any) => (
    <div>Plant Card - {post.title}</div>
  ),
}));

jest.mock("../../components/ui/PlantFormDialog", () => ({
  __esModule: true,
  default: () => <div>Plant Dialog</div>,
}));

jest.mock("../../components/ui/GetinTouch", () => ({
  __esModule: true,
  default: () => <div>Get In Touch Section</div>,
}));

jest.mock("../../components/ui/ArticlesSection", () => ({
  __esModule: true,
  default: () => <div>Articles Section</div>,
}));

jest.mock("../../components/ui/ContactFormSection", () => ({
  __esModule: true,
  default: () => <div>Contact Form Section</div>,
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
const renderPage = () => render(<Dashboard />);

/* ------------------------------------------------------------------ */
/* TESTS */
/* ------------------------------------------------------------------ */
describe("Dashboard Page", () => {
  test("renders hero section", () => {
    renderPage();

    expect(
      screen.getByRole("heading", {
        name: /welcome to plant disease detection system with ai/i,
      })
    ).toBeInTheDocument();
  });

  test("renders info section", () => {
    renderPage();

    const headings = screen.getAllByRole("heading", {
      name: /plant disease detection system with ai/i,
    });

    expect(headings.length).toBeGreaterThan(1);
    expect(screen.getByText(/info section/i)).toBeInTheDocument();
  });

  test("renders CTA button", () => {
    renderPage();

    expect(
      screen.getByRole("button", { name: /upload your plant now/i })
    ).toBeInTheDocument();
  });

  test("renders features section", () => {
    renderPage();

    expect(
      screen.getByText(/features section/i)
    ).toBeInTheDocument();
  });

  test("renders marketplace section with plant cards", async () => {
    renderPage();

    expect(
      await screen.findByText(/plant card - plant one/i)
    ).toBeInTheDocument();
  });

  test("renders View More Adds button", () => {
    renderPage();

    expect(
      screen.getByRole("button", { name: /view more adds/i })
    ).toBeInTheDocument();
  });

  test("renders articles section", () => {
    renderPage();

    expect(
      screen.getByText(/articles section/i)
    ).toBeInTheDocument();
  });

  test("renders contact form section", () => {
    renderPage();

    expect(
      screen.getByText(/contact form section/i)
    ).toBeInTheDocument();
  });

  test("renders FAQ and Social Connect sections", () => {
    renderPage();

    expect(screen.getByText(/faq section/i)).toBeInTheDocument();
    expect(screen.getByText(/social connect section/i)).toBeInTheDocument();
  });
});
