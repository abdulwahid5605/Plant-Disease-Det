import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlantFormDialog from "../../components/ui/PlantFormDialog";
import { renderWithProviders } from "../../../test-utils";

describe("PlantFormDialog", () => {
  test("submits form in create mode", () => {
    const onSubmit = jest.fn();

    renderWithProviders(
      <PlantFormDialog
        isOpen
        mode="create"
        onClose={jest.fn()}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(
      screen.getByText("Plant Name").nextSibling as HTMLElement,
      { target: { value: "Tulip" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/20,000/i),
      { target: { value: "2000" } }
    );

    fireEvent.change(
      screen.getByText("Phone Number").nextSibling as HTMLElement,
      { target: { value: "03001234567" } }
    );

    fireEvent.change(
      screen.getByText("Email Address").nextSibling as HTMLElement,
      { target: { value: "test@mail.com" } }
    );

    fireEvent.change(
      screen.getByText("Location / Address").nextSibling as HTMLElement,
      { target: { value: "Karachi" } }
    );

    fireEvent.change(
      screen.getByText("Plant Age").nextSibling as HTMLElement,
      { target: { value: "6 months" } }
    );

    fireEvent.change(
      screen.getByText("Description").nextSibling as HTMLElement,
      { target: { value: "Nice plant" } }
    );

    fireEvent.click(
      screen.getByRole("button", { name: /add post/i })
    );

    expect(onSubmit).toHaveBeenCalled();
  });
});
