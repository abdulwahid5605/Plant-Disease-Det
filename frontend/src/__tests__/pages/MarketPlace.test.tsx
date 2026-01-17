import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MarketPlace from "../../pages/MarketPlace";

/* ------------------------------------------------------------------ */
/* MOCK Chakra UI */
/* ------------------------------------------------------------------ */
jest.mock("@chakra-ui/react", () => ({
  Box: ({ children }: any) => <div>{children}</div>,
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
  SimpleGrid: ({ children }: any) => <div>{children}</div>,
  Heading: ({ children }: any) => <h1>{children}</h1>,
  Text: ({ children }: any) => <span>{children}</span>,
  Flex: ({ children }: any) => <div>{children}</div>,
  useDisclosure: () => ({
    open: false,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  }),
}));

/* ------------------------------------------------------------------ */
/* MOCK react-router-dom */
/* ------------------------------------------------------------------ */
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

/* ------------------------------------------------------------------ */
/* MOCK axios */
/* ------------------------------------------------------------------ */
jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: [],
    })
  ),
  post: jest.fn(() => Promise.resolve({ status: 200 })),
  patch: jest.fn(() => Promise.resolve({ status: 200 })),
  delete: jest.fn(() => Promise.resolve({ status: 200 })),
}));

/* ------------------------------------------------------------------ */
/* MOCK CHILD COMPONENTS */
/* ------------------------------------------------------------------ */
jest.mock("../../components/ui/plant-card", () => ({
  __esModule: true,
  default: ({ post }: any) => (
    <div>Plant Card - {post?.title || "Mock Plant"}</div>
  ),
}));

jest.mock("../../components/ui/HeroSection", () => ({
  __esModule: true,
  default: ({ title }: any) => (
    <section>
      <h1>{title}</h1>
    </section>
  ),
}));

jest.mock("../../components/ui/InfoSection", () => ({
  __esModule: true,
  default: ({ heading }: any) => (
    <section>
      <h2>{heading}</h2>
    </section>
  ),
}));

jest.mock("../../components/ui/FAQSection", () => ({
  __esModule: true,
  default: () => <div>FAQ Section</div>,
}));

jest.mock("../../components/modals/MessageModal", () => ({
  __esModule: true,
  default: ({ isOpen }: any) =>
    isOpen ? <div>Message Modal</div> : null,
}));

jest.mock("../../components/ui/PlantFormDialog", () => ({
  __esModule: true,
  default: () => <div>Plant Form Dialog</div>,
}));

/* ------------------------------------------------------------------ */
/* HELPER */
/* ------------------------------------------------------------------ */
const renderPage = () => render(<MarketPlace />);

/* ------------------------------------------------------------------ */
/* TESTS */
/* ------------------------------------------------------------------ */
describe("MarketPlace Page", () => {
  test("renders hero section", () => {
    renderPage();

    expect(
      screen.getByRole("heading", {
        name: /welcome to plant disease detection system with ai/i,
      })
    ).toBeInTheDocument();
  });

  test("renders marketplace info section", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: /marketplace/i })
    ).toBeInTheDocument();
  });

  test("shows no plants available message when list is empty", async () => {
    renderPage();

    expect(
      await screen.findByText(/no plants available/i)
    ).toBeInTheDocument();
  });

  test("renders view toggle buttons", () => {
    renderPage();

    expect(
      screen.getByRole("button", { name: /all posts/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /my posts/i })
    ).toBeInTheDocument();
  });

  test("renders add post button", () => {
    renderPage();

    expect(
      screen.getByRole("button", { name: /\+ add post/i })
    ).toBeInTheDocument();
  });

  test("renders CTA section", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: /ready to start/i })
    ).toBeInTheDocument();

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
});
