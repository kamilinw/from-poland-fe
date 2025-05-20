import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "./mutation-keys";
import {
  convertCurrencyMutationOptions,
  useConvertCurrency,
} from "./use-convert-currency";

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

global.fetch = jest.fn();

describe("useConvertCurrency", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return response data", async () => {
    const useMutationMock = (useMutation as jest.Mock).mockReturnValue({
      data: { foo: "bar" },
    });

    const result = await useConvertCurrency();

    expect(useMutationMock).toHaveBeenCalled();
    expect(result).toEqual({ data: { foo: "bar" } });
  });

  it("should return mutation data", () => {
    const result = convertCurrencyMutationOptions();

    expect(result).toEqual({
      mutationKey: [MutationKeys.CONVERT_CURRENCY],
      mutationFn: expect.any(Function),
    });
  });

  it("should call mutation function with correct data", async () => {
    const postMock = (global.fetch as jest.Mock).mockResolvedValue({
      json: () =>
        Promise.resolve({ amountEur: 100, amountPln: 100, currencyRate: 1 }),
    });

    const result = await convertCurrencyMutationOptions().mutationFn({
      amount: 100,
    });

    expect(result).toEqual({ amountEur: 100, amountPln: 100, currencyRate: 1 });
    expect(postMock).toHaveBeenCalledWith(`http://localhost:3001/transaction`, {
      method: "POST",
      body: JSON.stringify({ amount: 100 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
});
