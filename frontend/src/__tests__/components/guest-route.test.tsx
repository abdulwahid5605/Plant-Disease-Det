import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import GuestRoute from "../../components/ui/GuestRoute";

describe("GuestRoute", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("renders children when user is NOT logged in", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <div>Guest Content</div>
              </GuestRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Guest Content")
    ).toBeInTheDocument();
  });

  test("redirects to dashboard when token exists", () => {
    localStorage.setItem("token", "fake-token");

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <div>Guest Content</div>
              </GuestRoute>
            }
          />
          <Route
            path="/dashboard"
            element={<div>Dashboard Page</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Dashboard Page")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Guest Content")
    ).not.toBeInTheDocument();
  });
});
