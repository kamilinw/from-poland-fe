import { render, screen } from "@testing-library/react";
import Home from "./page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders hello world heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { name: /hello world/i });
    expect(heading).toBeInTheDocument();
  });
});
