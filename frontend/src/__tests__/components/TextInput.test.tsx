import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput from "../../components/ui/TextInput";
import { renderWithProviders } from "../../../test-utils";

describe("TextInput", () => {
  test("renders label and input field", () => {
    renderWithProviders(
      <TextInput
        label="Email"
        placeholder="Enter email"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter email")
    ).toBeInTheDocument();
  });

  test("renders provided value", () => {
    renderWithProviders(
      <TextInput
        label="Username"
        placeholder="Enter username"
        value="bilal123"
        onChange={() => {}}
      />
    );

    expect(
      screen.getByDisplayValue("bilal123")
    ).toBeInTheDocument();
  });

  test("calls onChange when typing", () => {
    const handleChange = jest.fn();

    renderWithProviders(
      <TextInput
        label="Name"
        placeholder="Enter name"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter name"),
      { target: { value: "Bilal" } }
    );

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("respects input type prop", () => {
    renderWithProviders(
      <TextInput
        label="Password"
        type="password"
        placeholder="Enter password"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText("Enter password");
    expect(input).toHaveAttribute("type", "password");
  });
});
