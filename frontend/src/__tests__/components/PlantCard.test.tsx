import * as React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlantCard from "../../components/ui/plant-card";
import { renderWithProviders } from "../../../test-utils";

const post = {
  _id: "1",
  title: "Rose Plant",
  price: 2000,
  number: "03001234567",
  address: "Karachi",
  image: "rose.jpg",
};

describe("PlantCard", () => {
  test("renders plant info", () => {
    renderWithProviders(
      <PlantCard
        post={post}
        isMyPost={false}
        onView={jest.fn()}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );

    expect(screen.getByText(/rose plant/i)).toBeInTheDocument();
    expect(screen.getByText(/karachi/i)).toBeInTheDocument();
    expect(screen.getByText(/2,000/)).toBeInTheDocument();
  });
});
