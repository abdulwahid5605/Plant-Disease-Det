import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithChakra } from "../../test-utils";
import MarketPlace from "../../pages/MarketPlace";

// mock data
jest.mock("../../../data", () => ({
  __esModule: true,
  default: {
    marketplacePosts: [
      {
        id: "1",
        title: "Rose Plant",
        price: 500,
        image: "/rose.jpg",
        description: "Healthy rose plant",
      },
    ],
    faqItems: [
      {
        value: "a",
        title: "Test FAQ",
        text: "FAQ description",
      },
    ],
  },
}));

describe("MarketPlace Page", () => {
  test("renders hero heading", () => {
    renderWithChakra(<MarketPlace />);

    expect(
      screen.getByText(/Welcome to Plant Disease Detection System With AI/i)
    ).toBeInTheDocument();
  });

  test("renders existing marketplace posts", () => {
    renderWithChakra(<MarketPlace />);

    expect(screen.getByText("Rose Plant")).toBeInTheDocument();
    expect(screen.getByText(/Rs 500/i)).toBeInTheDocument();
    expect(
      screen.getByText("Healthy rose plant")
    ).toBeInTheDocument();
  });

  test("renders Add Post button", () => {
    renderWithChakra(<MarketPlace />);

    expect(
      screen.getByText("+ Add Post")
    ).toBeInTheDocument();
  });

  test("adds a new post when form is filled", () => {
    renderWithChakra(<MarketPlace />);

    // open dialog (logic-level, Chakra handles UI)
    fireEvent.click(screen.getByText("+ Add Post"));

    fireEvent.change(screen.getByPlaceholderText("Plant Name"), {
      target: { value: "Tulip" },
    });
    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "300" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Fresh tulip plant" },
    });

    fireEvent.click(screen.getByText("Post"));

    expect(screen.getByText("Tulip")).toBeInTheDocument();
    expect(screen.getByText(/Rs 300/i)).toBeInTheDocument();
  });

  test("renders FAQ section", () => {
    renderWithChakra(<MarketPlace />);

    expect(
      screen.getByText("Frequently Asked Questions")
    ).toBeInTheDocument();

    expect(screen.getByText("Test FAQ")).toBeInTheDocument();
  });

  test("renders Ready to Start section", () => {
    renderWithChakra(<MarketPlace />);

    expect(
      screen.getByText("Ready to Start?")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Upload Your Plant Now")
    ).toBeInTheDocument();
  });
});
