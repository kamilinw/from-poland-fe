import { render, screen } from "@testing-library/react";
import { MainNavigation } from "./main-navigation";
import { navigationConfig } from "./navigation-config";
import "@testing-library/jest-dom";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("MainNavigation", () => {
  const mockUsePathname = usePathname as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all navigation items from config", () => {
    mockUsePathname.mockReturnValue("/");
    render(<MainNavigation>Test Content</MainNavigation>);

    navigationConfig.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("correctly identifies active navigation item", () => {
    const activePath = navigationConfig[0].href;
    mockUsePathname.mockReturnValue(activePath);

    render(<MainNavigation>Test Content</MainNavigation>);

    const activeItem = screen.getByText(navigationConfig[0].label);
    expect(activeItem).toHaveClass("navigationItemActive");
  });

  it("renders children content", () => {
    mockUsePathname.mockReturnValue("/");
    render(<MainNavigation>Test Content</MainNavigation>);

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
