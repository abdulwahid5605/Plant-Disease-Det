import * as React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithChakra } from "../../test-utils";
import ContactForm from "../../pages/ContactForm";

// mock toaster
const createMock = jest.fn();
const updateMock = jest.fn();

jest.mock("../../../components/ui/toaster", () => ({
  toaster: {
    create: createMock,
    update: updateMock,
  },
}));

// mock data for FAQ
jest.mock("../../data.tsx", () => ({
  __esModule: true,
  default: {
    faqItems: [
      {
        value: "a",
        title: "Test FAQ",
        text: "FAQ description",
      },
    ],
  },
}));

describe("ContactForm Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  test("renders contact form fields", () => {
    renderWithChakra(<ContactForm />);

    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(screen.getByText("Send Message")).toBeInTheDocument();
  });

  test("shows warning toast when required fields are missing", () => {
    renderWithChakra(<ContactForm />);

    fireEvent.click(screen.getByText("Send Message"));

    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Missing Fields",
        type: "warning",
      })
    );
  });

  test("submits form successfully when fields are filled", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({});

    renderWithChakra(<ContactForm />);

    fireEvent.change(screen.getByPlaceholderText("Your Name"), {
      target: { value: "Bilal" },
    });
    fireEvent.change(screen.getByPlaceholderText("yourname@example.com"), {
      target: { value: "bilal@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Write your message here..."), {
      target: { value: "Hello" },
    });

    fireEvent.click(screen.getByText("Send Message"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(updateMock).toHaveBeenCalled();
    });
  });

  test("renders FAQ section", () => {
    renderWithChakra(<ContactForm />);

    expect(
      screen.getByText("Frequently Asked Questions")
    ).toBeInTheDocument();

    expect(screen.getByText("Test FAQ")).toBeInTheDocument();
  });
});
