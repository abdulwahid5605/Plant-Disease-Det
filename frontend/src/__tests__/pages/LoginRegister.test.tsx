import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthPage from "../../pages/LoginRegister";

/* ------------------------------------------------------------------ */
/* MOCK Chakra UI */
/* ------------------------------------------------------------------ */
jest.mock("@chakra-ui/react", () => ({
  Box: ({ children }: any) => <div>{children}</div>,
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
  Input: ({ value, onChange, placeholder }: any) => (
    <input value={value} onChange={onChange} placeholder={placeholder} />
  ),
  VStack: ({ children }: any) => <div>{children}</div>,
  Heading: ({ children }: any) => <h1>{children}</h1>,
  Text: ({ children, onClick }: any) => (
    <span onClick={onClick}>{children}</span>
  ),
  Link: ({ children }: any) => <a>{children}</a>,
  Center: ({ children }: any) => <div>{children}</div>,
  Select: ({ children }: any) => <select>{children}</select>,
  Tabs: {
    Root: ({ children }: any) => <div>{children}</div>,
    List: ({ children }: any) => <div>{children}</div>,
    Trigger: ({ children, onClick }: any) => (
      <button onClick={onClick}>{children}</button>
    ),
    Content: ({ children }: any) => <div>{children}</div>,
  },
}));

/* ------------------------------------------------------------------ */
/* MOCK auth services */
/* ------------------------------------------------------------------ */
jest.mock("../../services/auth", () => ({
  registerUser: jest.fn(() => Promise.resolve()),
  loginUser: jest.fn(() =>
    Promise.resolve({ message: "OTP sent" })
  ),
  verifyOtp: jest.fn(() =>
    Promise.resolve({ access_token: "fake-token" })
  ),
}));

/* ------------------------------------------------------------------ */
/* MOCK toaster */
/* ------------------------------------------------------------------ */
jest.mock("../../components/ui/toaster", () => ({
  toaster: {
    create: jest.fn(() => "toast-id"),
    update: jest.fn(),
  },
}));

/* ------------------------------------------------------------------ */
/* MOCK ConfirmModal */
/* ------------------------------------------------------------------ */
jest.mock("../../components/modals/ConfirmModal", () => ({
  __esModule: true,
  default: ({ isOpen, onConfirm, onClose }: any) =>
    isOpen ? (
      <div>
        <p>Confirm Modal</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null,
}));

/* ------------------------------------------------------------------ */
/* HELPER */
/* ------------------------------------------------------------------ */
const renderPage = () => render(<AuthPage />);

/* ------------------------------------------------------------------ */
/* TESTS */
/* ------------------------------------------------------------------ */
describe("AuthPage (Login / Register)", () => {
  test("renders login tab by default", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: /welcome back/i })
    ).toBeInTheDocument();

    const loginButtons = screen.getAllByRole("button", {
      name: /login/i,
    });
    expect(loginButtons.length).toBeGreaterThan(0);
  });

  test("switches to signup tab", () => {
    renderPage();

    const signUpButtons = screen.getAllByText(/sign up/i);
    fireEvent.click(signUpButtons[0]); // 🔥 tab button

    expect(
      screen.getByRole("heading", { name: /create account/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("shows warning when login fields are empty", () => {
    renderPage();

    const loginButtons = screen.getAllByRole("button", {
      name: /login/i,
    });
    fireEvent.click(loginButtons[loginButtons.length - 1]); // 🔥 form login button

    const { toaster } = require("../../components/ui/toaster");
    expect(toaster.create).toHaveBeenCalled();
  });

  test("opens confirm modal on register when fields are filled", () => {
    renderPage();

    const signUpButtons = screen.getAllByText(/sign up/i);
    fireEvent.click(signUpButtons[0]);

    fireEvent.change(
      screen.getByPlaceholderText(/enter your full name/i),
      { target: { value: "Bilal" } }
    );

    const emailInputs = screen.getAllByPlaceholderText(
      /yourname@example.com/i
    );
    fireEvent.change(emailInputs[1], {
      target: { value: "bilal@test.com" },
    });

    fireEvent.change(
      screen.getByPlaceholderText(/enter your phone number/i),
      { target: { value: "123456789" } }
    );

    fireEvent.change(
      screen.getAllByPlaceholderText(/enter password/i)[1],
      { target: { value: "password123" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/enter your address/i),
      { target: { value: "Lahore" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: /register/i })
    );

    expect(
      screen.getByText(/confirm modal/i)
    ).toBeInTheDocument();
  });

  test("shows OTP screen after login", async () => {
    renderPage();

    const emailInputs = screen.getAllByPlaceholderText(
      /yourname@example.com/i
    );
    fireEvent.change(emailInputs[0], {
      target: { value: "bilal@test.com" },
    });

    fireEvent.change(
      screen.getAllByPlaceholderText(/enter password/i)[0],
      { target: { value: "password123" } }
    );

    const loginButtons = screen.getAllByRole("button", {
      name: /login/i,
    });
    fireEvent.click(loginButtons[loginButtons.length - 1]);

    expect(
      await screen.findByRole("heading", { name: /enter otp/i })
    ).toBeInTheDocument();
  });
});
