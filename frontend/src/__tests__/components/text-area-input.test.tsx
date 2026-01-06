import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithChakra } from "../../test-utils";
import TextAreaInput from "../../components/ui/TextAreaInput";

describe("TextAreaInput", () => {
  test("renders label and textarea", () => {
    renderWithChakra(
      <TextAreaInput
        label="Description"
        placeholder="Enter text"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter text")
    ).toBeInTheDocument();
  });

  test("shows provided value", () => {
    renderWithChakra(
      <TextAreaInput
        label="Message"
        placeholder="Type here"
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

    renderWithChakra(
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

    expect(handleChange).toHaveBeenCalled();
  });
});
