import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import Footer from "../../components/ui/footer";

const renderFooter = () => {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
};

describe("Footer", () => {
  test("renders logo image", () => {
    renderFooter();

    const logo = screen.getByAltText(/plantapp logo/i);
    expect(logo).toBeInTheDocument();
  });

  test("renders brand description text", () => {
    renderFooter();

    expect(
      screen.getByText(/plant disease detection system with ai/i)
    ).toBeInTheDocument();
  });

  test("renders Explore section links", () => {
    renderFooter();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Articles")).toBeInTheDocument();
    expect(screen.getByText("Market place")).toBeInTheDocument();
    expect(screen.getByText("AI Disease Tool")).toBeInTheDocument();
  });

  test("renders Support section links", () => {
    renderFooter();

    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("renders social media icons with aria-labels", () => {
    renderFooter();

    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
  });

  test("renders dynamic current year in copyright", () => {
    renderFooter();

    const currentYear = new Date().getFullYear().toString();

    expect(
      screen.getByText(new RegExp(currentYear))
    ).toBeInTheDocument();
  });
});
