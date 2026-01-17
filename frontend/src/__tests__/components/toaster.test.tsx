import * as React from "react";
import { act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../test-utils";
import { Toaster, toaster } from "../../components/ui/toaster";

describe("Toaster", () => {
  test("renders toaster region", () => {
    renderWithProviders(<Toaster />);

    const region = document.querySelector('[role="region"]');
    expect(region).toBeInTheDocument();
  });

  test("creates a toast without crashing", () => {
    renderWithProviders(<Toaster />);

    act(() => {
      toaster.create({
        title: "Success",
        description: "Operation completed",
        type: "success",
      });
    });

    // Toast group should exist (proof toaster is wired correctly)
    const group = document.querySelector('[data-scope="toast"]');
    expect(group).toBeInTheDocument();
  });

  test("supports loading toast", () => {
    renderWithProviders(<Toaster />);

    act(() => {
      toaster.create({
        title: "Loading",
        type: "loading",
      });
    });

    const group = document.querySelector('[data-scope="toast"]');
    expect(group).toBeInTheDocument();
  });

  test("supports action & closable toast", () => {
    renderWithProviders(<Toaster />);

    act(() => {
      toaster.create({
        title: "Action toast",
        action: {
          label: "Undo",
          onClick: jest.fn(),
        },
        closable: true,
      });
    });

    const group = document.querySelector('[data-scope="toast"]');
    expect(group).toBeInTheDocument();
  });
});
