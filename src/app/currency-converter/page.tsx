"use client";

import { useConvertCurrency } from "@/libs/mutations/use-convert-currency";
import styles from "./currency-converter.module.scss";

export default function CurrencyConverterPage() {
  const {
    data,
    mutateAsync: convertCurrency,
    error,
    isPending,
  } = useConvertCurrency();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount");
    await convertCurrency({ amount: Number(amount) });
  };

  const errorMessage =
    error?.message || (data && "error" in data ? data.message : null);

  return (
    <div className={styles.container}>
      <h1>Currency Converter</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="amount">Amount in EUR</label>
          <input
            type="number"
            placeholder="EUR"
            name="amount"
            id="amount"
            className={styles.input}
            step={0.01}
            required
            min={0}
          />
        </div>
        <button className={styles.button} type="submit" disabled={isPending}>
          Convert
        </button>
      </form>
      {data && "amountPln" in data ? (
        <p>Converted amount: {data.amountPln} PLN</p>
      ) : null}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
}
