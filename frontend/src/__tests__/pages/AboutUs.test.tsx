import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutUs from "../../pages/AboutUs";

/* ------------------------------------------------------------------ */
/* MOCK Chakra UI (IMPORTANT FIX) */
/* ------------------------------------------------------------------ */
jest.mock("@chakra-ui/react", () => ({
  Box: ({ children }: any) => <div>{children}</div>,
  Heading: ({ children }: any) => <h1>{children}</h1>,
  Text: ({ children }: any) => <p>{children}</p>,
  Button: ({ children }: any) => <button>{children}</button>,
  SimpleGrid: ({ children }: any) => <div>{children}</div>,
  Image: () => <img alt="mock-image" />,
}));

/* ------------------------------------------------------------------ */
/* MOCK CHILD SECTIONS */
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

jest.mock("../../components/ui/FeatureSection", () => ({
  __esModule: true,
  default: () => <div>Features Section</div>,
}));

jest.mock("../../components/ui/GetinTouch", () => ({
  __esModule: true,
  default: () => <div>Get In Touch Section</div>,
}));

jest.mock("../../components/ui/FAQSection", () => ({
  __esModule: true,
  default: () => <div>FAQ Section</div>,
}));

/* ------------------------------------------------------------------ */
/* MOCK data.tsx */
/* ------------------------------------------------------------------ */
jest.mock("../../../data.tsx", () => ({
  __esModule: true,
  default: {
    features: [
      { title: "AI Detection", description: "Detect diseases using AI" },
      { title: "Fast Results", description: "Instant diagnosis" },
    ],
  },
}));


/* ------------------------------------------------------------------ */
/* HELPER */
/* ------------------------------------------------------------------ */
const renderPage = () => render(<AboutUs />);

/* ------------------------------------------------------------------ */
/* TESTS */
/* ------------------------------------------------------------------ */
describe("AboutUs Page", () => {
  test("renders hero section with title and subtitle", () => {
    renderPage();

    expect(
      screen.getByRole("heading", {
        name: /welcome to plant disease detection system with ai/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/we use artificial intelligence/i)
    ).toBeInTheDocument();
  });

  test("renders info section content", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: /who we are/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/plantapp is a smart agriculture platform/i)
    ).toBeInTheDocument();
  });

  test("renders features section", () => {
    renderPage();

    expect(
      screen.getByText(/features section/i)
    ).toBeInTheDocument();
  });

  test("renders Get In Touch section", () => {
    renderPage();

    expect(
      screen.getByText(/get in touch section/i)
    ).toBeInTheDocument();
  });

  test("renders team section with members", () => {
    renderPage();

    expect(
      screen.getByText("Ali Khan")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Sara Ahmed")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Usman Tariq")
    ).toBeInTheDocument();
  });

  test("renders FAQ section", () => {
    renderPage();

    expect(
      screen.getByText(/faq section/i)
    ).toBeInTheDocument();
  });

  test("renders CTA button", () => {
    renderPage();

    expect(
      screen.getByRole("button", { name: /upload your plant now/i })
    ).toBeInTheDocument();
  });
});
