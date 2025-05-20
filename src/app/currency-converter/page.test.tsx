import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CurrencyConverterPage from "./page";
import "@testing-library/jest-dom";
import { useConvertCurrency } from "@/libs/mutations/use-convert-currency";

jest.mock("@/libs/mutations/use-convert-currency");

describe("CurrencyConverterPage", () => {
  const mockConvertCurrency = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useConvertCurrency as jest.Mock).mockReturnValue({
      data: null,
      mutateAsync: mockConvertCurrency,
      error: null,
      isPending: false,
    });
  });

  it("renders the component with initial state", () => {
    render(<CurrencyConverterPage />);
    expect(screen.getByText("Currency Converter")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount in EUR")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Convert" })).toBeInTheDocument();
  });

  it("handles form submission with valid input", async () => {
    const mockData = { amountPln: 4.5 };
    mockConvertCurrency.mockResolvedValueOnce(mockData);

    render(<CurrencyConverterPage />);
    const input = screen.getByLabelText("Amount in EUR");
    const submitButton = screen.getByRole("button", { name: "Convert" });

    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockConvertCurrency).toHaveBeenCalledWith({ amount: 1 });
    });
  });

  it("handles error state", async () => {
    const errorMessage = "Error fixture";
    (useConvertCurrency as jest.Mock).mockReturnValue({
      data: null,
      mutateAsync: mockConvertCurrency,
      error: new Error(errorMessage),
      isPending: false,
    });

    render(<CurrencyConverterPage />);
    const input = screen.getByLabelText("Amount in EUR");
    const submitButton = screen.getByRole("button", { name: "Convert" });

    fireEvent.change(input, { target: { value: "1" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it("handles loading state", () => {
    (useConvertCurrency as jest.Mock).mockReturnValue({
      data: null,
      mutateAsync: mockConvertCurrency,
      error: null,
      isPending: true,
    });

    render(<CurrencyConverterPage />);
    const submitButton = screen.getByRole("button", { name: "Convert" });
    expect(submitButton).toBeDisabled();
  });

  it("validates input is required", async () => {
    render(<CurrencyConverterPage />);
    const submitButton = screen.getByRole("button", { name: "Convert" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockConvertCurrency).not.toHaveBeenCalled();
    });
  });

  it("validates input is positive", async () => {
    render(<CurrencyConverterPage />);
    const input = screen.getByLabelText("Amount in EUR");
    const submitButton = screen.getByRole("button", { name: "Convert" });

    fireEvent.change(input, { target: { value: "-1" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockConvertCurrency).not.toHaveBeenCalled();
    });
  });
});
