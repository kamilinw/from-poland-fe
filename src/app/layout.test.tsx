import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";
import "@testing-library/jest-dom";

describe("RootLayout", () => {
  it("renders children correctly", () => {
    const testChild = <div data-testid="test-child">Test Content</div>;
    render(<RootLayout>{testChild}</RootLayout>);

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
