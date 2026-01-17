import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactForm from "../../pages/ContactForm";

/* ------------------------------------------------------------------ */
/* MOCK Chakra UI */
/* ------------------------------------------------------------------ */
jest.mock("@chakra-ui/react", () => ({
  Box: ({ children }: any) => <div>{children}</div>,
  Heading: ({ children }: any) => <h1>{children}</h1>,
  Button: ({ children }: any) => <button>{children}</button>,
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

jest.mock("../../components/ui/ContactFormSection", () => ({
  __esModule: true,
  default: ({ title }: any) => (
    <section>
      <h2>{title}</h2>
      <p>Contact Form Section</p>
    </section>
  ),
}));

jest.mock("../../components/ui/GetinTouch", () => ({
  __esModule: true,
  default: () => <div>Get In Touch Section</div>,
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
const renderPage = () => render(<ContactForm />);

/* ------------------------------------------------------------------ */
/* TESTS */
/* ------------------------------------------------------------------ */
describe("ContactForm Page", () => {
  test("renders hero section with title and subtitle", () => {
    renderPage();

    expect(
      screen.getByRole("heading", {
        name: /welcome to plant disease detection system with ai/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/have questions or need support/i)
    ).toBeInTheDocument();
  });

  test("renders info section content", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: /contact us/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/have a question, suggestion, or need assistance/i)
    ).toBeInTheDocument();
  });

  test("renders contact form section", () => {
    renderPage();

    expect(
      screen.getByText(/contact form section/i)
    ).toBeInTheDocument();
  });

  test("renders Get In Touch section", () => {
    renderPage();

    expect(
      screen.getByText(/get in touch section/i)
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
