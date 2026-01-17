import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { renderWithProviders } from "../../../test-utils";

describe("ConfirmModal", () => {
  test("renders title and message", () => {
    renderWithProviders(
      <ConfirmModal
        isOpen
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        title="Delete Plant"
        message="Are you sure?"
      />
    );

    expect(screen.getByText("Delete Plant")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  test("falls back to title when message is missing", () => {
    renderWithProviders(
      <ConfirmModal
        isOpen
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        title="Confirm Action"
      />
    );

    const items = screen.getAllByText("Confirm Action");
    expect(items.length).toBeGreaterThan(0);
  });

  test("confirm button calls onConfirm", () => {
    const onConfirm = jest.fn();

    renderWithProviders(
      <ConfirmModal
        isOpen
        onClose={jest.fn()}
        onConfirm={onConfirm}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /yes/i }));
    expect(onConfirm).toHaveBeenCalled();
  });

  test("cancel button calls onClose", () => {
    const onClose = jest.fn();

    renderWithProviders(
      <ConfirmModal
        isOpen
        onClose={onClose}
        onConfirm={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
