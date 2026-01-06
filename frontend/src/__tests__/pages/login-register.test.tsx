import * as React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithChakra } from "../../test-utils";
import AuthPage from "../../pages/LoginRegister";

// mock toaster
const createMock = jest.fn();
const updateMock = jest.fn();

jest.mock("../../components/ui/toaster", () => ({
  toaster: {
    create: createMock,
    update: updateMock,
  },
}));

// mock auth services
jest.mock("../../services/auth", () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
  verifyOtp: jest.fn(),
}));

import { registerUser, loginUser, verifyOtp } from "../../services/auth";

describe("AuthPage (Login & Register)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    Object.defineProperty(window, "location", {
      value: { href: "" },
      writable: true,
    });
  });

  test("renders login form by default", () => {
    renderWithChakra(<AuthPage />);

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("shows warning when login fields are empty", () => {
    renderWithChakra(<AuthPage />);

    fireEvent.click(screen.getByText("Login"));

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Missing Fields",
        type: "warning",
      })
    );
  });

  test("successful login moves to OTP step", async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({});

    renderWithChakra(<AuthPage />);

    fireEvent.change(screen.getByPlaceholderText("yourname@example.com"), {
      target: { value: "bilal@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Enter OTP")).toBeInTheDocument();
    });
  });

  test("shows warning when OTP is missing", async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({});

    renderWithChakra(<AuthPage />);

    fireEvent.change(screen.getByPlaceholderText("yourname@example.com"), {
      target: { value: "bilal@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      fireEvent.click(screen.getByText("Verify OTP"));
    });

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Missing OTP",
      })
    );
  });

  test("successful OTP verification stores token and redirects", async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({});
    (verifyOtp as jest.Mock).mockResolvedValueOnce({
      access_token: "fake-token",
    });

    renderWithChakra(<AuthPage />);

    fireEvent.change(screen.getByPlaceholderText("yourname@example.com"), {
      target: { value: "bilal@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() =>
      fireEvent.change(screen.getByPlaceholderText("Enter 6-digit OTP"), {
        target: { value: "123456" },
      })
    );

    fireEvent.click(screen.getByText("Verify OTP"));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("fake-token");
      expect(window.location.href).toBe("/dashboard");
    });
  });

  test("register shows warning when fields are empty", () => {
    renderWithChakra(<AuthPage />);

    fireEvent.click(screen.getByText("Sign Up"));
    fireEvent.click(screen.getByText("Register"));

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Missing Fields",
        type: "warning",
      })
    );
  });
});
