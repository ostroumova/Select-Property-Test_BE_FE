import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App", () => {
  test("renders header component", () => {
    render(<App />);

    const mainHeaderElement = screen.getByRole("heading", {
      name: "Rent out your property",
    });
    const secondaryHeaderElement = screen.getByRole("heading", {
      name: "Make extra money",
    });
    expect(mainHeaderElement).toBeInTheDocument();
    expect(secondaryHeaderElement).toBeInTheDocument();
  });
  test("render footer component", () => {
    render(<App />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });
  test("render property list", async () => {
    render(<App />);
    await waitFor(() => {
      const propertyListElement = screen.getByTestId("properties-container");
      expect(propertyListElement).toBeInTheDocument();
    });
  });
  test("render form for uploading property", () => {
    render(<App />);
    const formButton = screen.getByRole("button", { name: "Submit" });
    expect(formButton).toBeInTheDocument();
  });
});
