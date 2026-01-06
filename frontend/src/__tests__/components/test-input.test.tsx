import * as React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithChakra } from "../../test-utils";
import TextInput from "../../components/ui/TextInput";

describe("TextInput", () => {
  test("renders label and input", () => {
    renderWithChakra(
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

  test("renders input with provided value", () => {
    renderWithChakra(
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

  test("uses default input type text", () => {
    renderWithChakra(
      <TextInput
        label="Name"
        placeholder="Enter name"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText("Enter name") as HTMLInputElement;
    expect(input.type).toBe("text");
  });

  test("uses provided input type", () => {
    renderWithChakra(
      <TextInput
        label="Password"
        type="password"
        placeholder="Enter password"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText("Enter password") as HTMLInputElement;
    expect(input.type).toBe("password");
  });

  test("calls onChange when typing", () => {
    const handleChange = jest.fn();

    renderWithChakra(
      <TextInput
        label="Email"
        placeholder="Enter email"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter email"),
      { target: { value: "test@example.com" } }
    );

    expect(handleChange).toHaveBeenCalled();
  });
});
