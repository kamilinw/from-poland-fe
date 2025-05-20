import { useMutation } from "@tanstack/react-query";

import { MutationKeys } from "./mutation-keys";

interface ConvertCurrencyData {
  amount: number;
}

interface ConvertCurrencyResponse {
  amountEur: number;
  amountPln: number;
  currencyRate: number;
}

interface ConvertCurrencyError {
  message: string[];
  statusCode: number;
  error: string;
}

export const convertCurrencyMutationOptions = () => ({
  mutationKey: [MutationKeys.CONVERT_CURRENCY],
  mutationFn: ({
    amount,
  }: ConvertCurrencyData): Promise<
    ConvertCurrencyResponse | ConvertCurrencyError
  > =>
    fetch("http://localhost:3001/transaction", {
      method: "POST",
      body: JSON.stringify({ amount }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()),
});

export const useConvertCurrency = () =>
  useMutation(convertCurrencyMutationOptions());
