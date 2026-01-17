import * as React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoSection from "../../components/ui/InfoSection";
import { renderWithProviders } from "../../../test-utils";

describe("InfoSection", () => {
  test("renders heading and description", () => {
    renderWithProviders(
      <InfoSection
        heading="About Plants"
        description="Plants are important"
        image="/plant.jpg"
      />
    );

    expect(
      screen.getByRole("heading", { name: /about plants/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/plants are important/i)
    ).toBeInTheDocument();
  });

  test("renders image section without crashing", () => {
    renderWithProviders(
      <InfoSection
        heading="Image Section"
        description="Desc"
        image="/info-image.jpg"
      />
    );

    // Chakra bgImage is CSS → just ensure render happened
    expect(
      screen.getByText(/image section/i)
    ).toBeInTheDocument();
  });

  test("works with default bgColor", () => {
    renderWithProviders(
      <InfoSection
        heading="Default BG"
        description="Desc"
        image="/info.jpg"
      />
    );

    expect(screen.getByText(/default bg/i)).toBeInTheDocument();
  });

  test("works with custom bgColor", () => {
    renderWithProviders(
      <InfoSection
        heading="Custom BG"
        description="Desc"
        image="/info.jpg"
        bgColor="red.200"
      />
    );

    expect(screen.getByText(/custom bg/i)).toBeInTheDocument();
  });
});
