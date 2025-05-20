import { render, screen } from "@testing-library/react";
import { NavigationItem } from "./navigation-item";
import "@testing-library/jest-dom";
import React from "react";

describe("NavigationItem", () => {
  const defaultProps = {
    href: "/test",
    label: "Test Link",
    isActive: false,
  };

  it("renders with correct label", () => {
    render(<NavigationItem {...defaultProps} />);
    expect(screen.getByText("Test Link")).toBeInTheDocument();
  });

  it("renders with correct href", () => {
    render(<NavigationItem {...defaultProps} />);
    const link = screen.getByText("Test Link");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("applies active class when isActive is true", () => {
    render(<NavigationItem {...defaultProps} isActive={true} />);
    const link = screen.getByText("Test Link");
    expect(link).toHaveClass("navigationItemActive");
  });

  it("does not apply active class when isActive is false", () => {
    render(<NavigationItem {...defaultProps} isActive={false} />);
    const link = screen.getByText("Test Link");
    expect(link).not.toHaveClass("navigationItemActive");
  });
});
