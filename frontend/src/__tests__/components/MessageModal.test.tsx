import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MessageModal from "../../components/modals/MessageModal";
import { renderWithProviders } from "../../../test-utils";

describe("MessageModal", () => {
  const baseProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: "Test Title",
    message: "Test Message",
  };

  test("renders title and message when open", () => {
    renderWithProviders(<MessageModal {...baseProps} />);

    expect(
      screen.getByText("Test Title")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Test Message")
    ).toBeInTheDocument();
  });

  test("renders default OK button", () => {
    renderWithProviders(<MessageModal {...baseProps} />);

    expect(
      screen.getByRole("button", { name: /ok/i })
    ).toBeInTheDocument();
  });

  test("calls onClose when button is clicked", () => {
    renderWithProviders(<MessageModal {...baseProps} />);

    fireEvent.click(
      screen.getByRole("button", { name: /ok/i })
    );

    expect(baseProps.onClose).toHaveBeenCalled();
  });

  test("renders custom button text", () => {
    renderWithProviders(
      <MessageModal {...baseProps} buttonText="Close Now" />
    );

    expect(
      screen.getByRole("button", { name: /close now/i })
    ).toBeInTheDocument();
  });

  test("does not render when isOpen is false", () => {
    renderWithProviders(
      <MessageModal {...baseProps} isOpen={false} />
    );

    expect(
      screen.queryByText("Test Title")
    ).not.toBeInTheDocument();
  });
});
