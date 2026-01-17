import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import HeroSection from "../../components/ui/HeroSection";
import { renderWithProviders } from "../../../test-utils";

/* ------------------------------------------------------------------ */
/* GLOBAL MOCKS */
/* ------------------------------------------------------------------ */
beforeAll(() => {
  window.scrollBy = jest.fn();
});

/* ------------------------------------------------------------------ */
/* TESTS */
/* ------------------------------------------------------------------ */
describe("HeroSection", () => {
  test("renders title", () => {
    renderWithProviders(
      <HeroSection title="Welcome to Plant App" />
    );

    expect(
      screen.getByRole("heading", {
        name: /welcome to plant app/i,
      })
    ).toBeInTheDocument();
  });

  test("renders subtitle when provided", () => {
    renderWithProviders(
      <HeroSection
        title="Welcome"
        subtitle="Detect plant diseases instantly"
      />
    );

    expect(
      screen.getByText(/detect plant diseases instantly/i)
    ).toBeInTheDocument();
  });

  test("does not render subtitle when not provided", () => {
    renderWithProviders(
      <HeroSection title="Welcome" />
    );

    expect(
      screen.queryByText(/detect plant diseases/i)
    ).not.toBeInTheDocument();
  });

  test("renders scroll down button by default", () => {
    renderWithProviders(
      <HeroSection title="Welcome" />
    );

    expect(
      screen.getByRole("button", {
        name: /scroll down/i,
      })
    ).toBeInTheDocument();
  });

  test("does not render scroll button when showScrollButton is false", () => {
    renderWithProviders(
      <HeroSection
        title="Welcome"
        showScrollButton={false}
      />
    );

    expect(
      screen.queryByRole("button", {
        name: /scroll down/i,
      })
    ).not.toBeInTheDocument();
  });

  test("calls window.scrollBy when scroll button is clicked", () => {
    renderWithProviders(
      <HeroSection title="Welcome" />
    );

    const btn = screen.getByRole("button", {
      name: /scroll down/i,
    });

    fireEvent.click(btn);

    expect(window.scrollBy).toHaveBeenCalledWith({
      top: window.innerHeight,
      behavior: "smooth",
    });
  });

  test("uses custom background image when provided", () => {
    const { container } = renderWithProviders(
      <HeroSection
        title="Welcome"
        backgroundImage="/custom-bg.jpg"
      />
    );

    const hero = container.firstChild as HTMLElement;

    expect(hero).toHaveStyle(
      `background-image: url('/custom-bg.jpg')`
    );
  });
});
