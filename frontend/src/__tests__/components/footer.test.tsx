import * as React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../test-utils";

import Footer from "../../components/ui/footer";

const renderFooter = () => {
  return renderWithProviders(<Footer />);
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
    screen.getAllByText(
      /plant disease detection system with ai/i
    ).length
  ).toBeGreaterThan(0);
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

    expect(
      screen.getByLabelText("Facebook")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Instagram")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Twitter")
    ).toBeInTheDocument();
  });

  test("renders dynamic current year in copyright", () => {
    renderFooter();

    const currentYear = new Date()
      .getFullYear()
      .toString();

    expect(
      screen.getByText(new RegExp(currentYear))
    ).toBeInTheDocument();
  });
});
