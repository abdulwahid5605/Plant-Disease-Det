import * as React from "react";
import {
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../../test-utils";

import ContactFormSection from "../../components/ui/ContactFormSection";

/* ------------------------------------------------------------------ */
/* 🔥 MOCK toaster */
/* ------------------------------------------------------------------ */
const createMock = jest.fn();
const updateMock = jest.fn();

jest.mock("../../components/ui/toaster", () => ({
  toaster: {
    create: (...args: any[]) => createMock(...args),
    update: (...args: any[]) => updateMock(...args),
  },
}));

/* ------------------------------------------------------------------ */
/* 🔥 MOCK custom inputs */
/* ------------------------------------------------------------------ */
jest.mock("../../components/ui/TextInput", () => (props: any) => (
  <input
    aria-label={props.label}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
  />
));

jest.mock("../../components/ui/TextAreaInput", () => (props: any) => (
  <textarea
    aria-label={props.label}
    placeholder={props.placeholder}
    value={props.value}
    onChange={props.onChange}
  />
));

/* ------------------------------------------------------------------ */
/* 🔥 MOCK fetch */
/* ------------------------------------------------------------------ */
global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true })
) as jest.Mock;

/* ------------------------------------------------------------------ */
/* TESTS */
/* ------------------------------------------------------------------ */
describe("ContactFormSection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders default title", () => {
    renderWithProviders(<ContactFormSection />);

    expect(
      screen.getByRole("heading", { name: /contact us/i })
    ).toBeInTheDocument();
  });

  test("renders custom title", () => {
    renderWithProviders(
      <ContactFormSection title="Get In Touch" />
    );

    expect(
      screen.getByRole("heading", { name: /get in touch/i })
    ).toBeInTheDocument();
  });

  test("shows warning toast if required fields are missing", () => {
    renderWithProviders(<ContactFormSection />);

    fireEvent.click(
      screen.getByRole("button", { name: /send message/i })
    );

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Missing Fields",
        type: "warning",
      })
    );
  });

  test("submits form successfully and shows success toast", async () => {
    createMock.mockReturnValueOnce("toast-id");

    renderWithProviders(<ContactFormSection />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "Bilal" },
    });

    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "123456789" },
    });

    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "bilal@test.com" },
    });

    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Hello there" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /send message/i })
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    expect(updateMock).toHaveBeenCalledWith(
      "toast-id",
      expect.objectContaining({
        title: "Message Sent",
        type: "success",
      })
    );
  });

  test("shows error toast if fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );
    createMock.mockReturnValueOnce("toast-id");

    renderWithProviders(<ContactFormSection />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "Bilal" },
    });

    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "123456789" },
    });

    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "bilal@test.com" },
    });

    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Hello" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /send message/i })
    );

    await waitFor(() => {
      expect(updateMock).toHaveBeenCalledWith(
        "toast-id",
        expect.objectContaining({
          title: "Failed",
          type: "error",
        })
      );
    });
  });

  test("renders image with correct src", () => {
    renderWithProviders(
      <ContactFormSection image="/custom-image.jpg" />
    );

    const img = screen.getByAltText("Contact");
    expect(img).toHaveAttribute(
      "src",
      "/custom-image.jpg"
    );
  });
});
