import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ExchangeRatePage from "./page";

global.fetch = jest.fn();

describe("ExchangeRatePage", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("renders exchange rate correctly", async () => {
    const mockExchangeRate = { exchange_rate: 4.5 };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockExchangeRate),
    });

    const { container } = render(await ExchangeRatePage());

    expect(screen.getByText("Exchange Rate")).toBeInTheDocument();
    expect(
      screen.getByText(/Currency exchange rate from EUR to PLN: 4.5/)
    ).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("container");
  });

  it("handles fetch error gracefully", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    const { container } = render(await ExchangeRatePage());

    expect(screen.getByText("Exchange Rate")).toBeInTheDocument();
    expect(
      screen.getByText("Failed to fetch exchange rate")
    ).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("container");
  });

  it("handles non-ok response gracefully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const { container } = render(await ExchangeRatePage());

    expect(screen.getByText("Exchange Rate")).toBeInTheDocument();
    expect(
      screen.getByText("Failed to fetch exchange rate")
    ).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("container");
  });
});
