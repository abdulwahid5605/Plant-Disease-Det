import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import GetinTouch from "../../components/ui/GetinTouch";

describe("GetinTouch", () => {
  test("renders main heading", () => {
    render(<GetinTouch />);

    expect(
      screen.getByRole("heading", { name: /get in touch/i })
    ).toBeInTheDocument();
  });

  test("renders all contact info items", () => {
    render(<GetinTouch />);

    expect(screen.getByText("Email Us")).toBeInTheDocument();
    expect(screen.getByText("support@plantapp.com")).toBeInTheDocument();

    expect(screen.getByText("Call Us")).toBeInTheDocument();
    expect(screen.getByText("+92 300 1234567")).toBeInTheDocument();

    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Karachi, Pakistan")).toBeInTheDocument();

    expect(screen.getByText("Working Hours")).toBeInTheDocument();
    expect(screen.getByText(/mon – fri, 9am – 6pm/i)).toBeInTheDocument();
  });

  test("renders help section heading", () => {
    render(<GetinTouch />);

    expect(
      screen.getByRole("heading", { name: /how can we help you/i })
    ).toBeInTheDocument();
  });

  test("renders all help items", () => {
    render(<GetinTouch />);

    expect(screen.getByText("Technical Support")).toBeInTheDocument();
    expect(
      screen.getByText(/facing issues with login, otp, or uploads/i)
    ).toBeInTheDocument();

    expect(screen.getByText("Marketplace Help")).toBeInTheDocument();
    expect(
      screen.getByText(/questions about buying or selling plants/i)
    ).toBeInTheDocument();

    expect(screen.getByText("AI Detection Queries")).toBeInTheDocument();
    expect(
      screen.getByText(/need help understanding disease results/i)
    ).toBeInTheDocument();
  });

  test("renders fast response guarantee section", () => {
    render(<GetinTouch />);

    expect(
      screen.getByRole("heading", { name: /fast response guarantee/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/we usually respond within/i)
    ).toBeInTheDocument();

    expect(screen.getByText("24 hours")).toBeInTheDocument();
  });
});
