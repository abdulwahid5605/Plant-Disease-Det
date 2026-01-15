import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextAreaInput from "../../components/ui/TextAreaInput";
import { renderWithProviders } from "../../../test-utils";

describe("TextAreaInput", () => {
  test("renders label and textarea", () => {
    renderWithProviders(
      <TextAreaInput
        label="Message"
        placeholder="Write your message"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Write your message")
    ).toBeInTheDocument();
  });

  test("renders provided value", () => {
    renderWithProviders(
      <TextAreaInput
        label="Description"
        placeholder="Enter description"
        value="Hello world"
        onChange={() => {}}
      />
    );

    expect(
      screen.getByDisplayValue("Hello world")
    ).toBeInTheDocument();
  });

  test("calls onChange when typing", () => {
    const handleChange = jest.fn();

    renderWithProviders(
      <TextAreaInput
        label="Comment"
        placeholder="Write comment"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Write comment"),
      { target: { value: "New text" } }
    );

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
