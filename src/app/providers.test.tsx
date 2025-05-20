import { render, screen } from "@testing-library/react";
import Providers from "./providers";
import "@testing-library/jest-dom";
import { getQueryClient } from "./get-query-client";
import { QueryClient } from "@tanstack/react-query";

jest.mock("./get-query-client", () => ({
  getQueryClient: jest.fn(),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Providers>{children}</Providers>;
};

describe("Providers", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const mockQueryClient = new QueryClient();
    (getQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it("renders children correctly", () => {
    const testMessage = "Test Child Component";

    render(
      <TestWrapper>
        <div>{testMessage}</div>
      </TestWrapper>
    );

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it("initializes QueryClientProvider with getQueryClient", () => {
    const mockQueryClient = new QueryClient();
    (getQueryClient as jest.Mock).mockReturnValue(mockQueryClient);

    render(
      <TestWrapper>
        <div>Test</div>
      </TestWrapper>
    );

    expect(getQueryClient).toHaveBeenCalledTimes(1);
  });
});
