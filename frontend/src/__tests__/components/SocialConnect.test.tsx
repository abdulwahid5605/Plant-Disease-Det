import * as React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SocialConnect from "../../components/ui/SocialConnect";
import { renderWithProviders } from "../../../test-utils";

describe("SocialConnect", () => {
  test("renders default heading and subtitle", () => {
    renderWithProviders(<SocialConnect />);

    expect(
      screen.getByRole("heading", { name: /connect with us/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/follow us on social media/i)
    ).toBeInTheDocument();
  });

  test("renders default social platforms", () => {
    renderWithProviders(<SocialConnect />);

    expect(screen.getByText("Facebook")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  });

  test("renders custom heading and subtitle when provided", () => {
    renderWithProviders(
      <SocialConnect
        heading="Stay Connected"
        subtitle="Join us everywhere"
      />
    );

    expect(
      screen.getByRole("heading", { name: /stay connected/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/join us everywhere/i)
    ).toBeInTheDocument();
  });

  test("renders custom platforms list", () => {
    const platforms = ["Twitter", "YouTube"];

    renderWithProviders(
      <SocialConnect platforms={platforms} />
    );

    expect(screen.getByText("Twitter")).toBeInTheDocument();
    expect(screen.getByText("YouTube")).toBeInTheDocument();
    expect(screen.queryByText("Facebook")).not.toBeInTheDocument();
  });

  test("renders correct number of platform items", () => {
    const platforms = ["A", "B", "C", "D"];

    renderWithProviders(
      <SocialConnect platforms={platforms} />
    );

    platforms.forEach((platform) => {
      expect(screen.getByText(platform)).toBeInTheDocument();
    });
  });
});
