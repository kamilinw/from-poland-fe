export const revalidate = 60;
import styles from "./exchange-rate.module.scss";

interface ExchangeRate {
  exchange_rate: number;
}

const fetchExchangeRate = async () => {
  try {
    const data = await fetch("http://localhost:3001/exchange-rate");
    if (!data.ok) {
      return null;
    }
    const exchangeRate: ExchangeRate = await data.json();
    return exchangeRate;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function ExchangeRatePage() {
  const exchangeRate = await fetchExchangeRate();

  return (
    <div className={styles.container}>
      <h1>Exchange Rate</h1>
      <p>
        {exchangeRate
          ? `Currency exchange rate from EUR to PLN: ${exchangeRate.exchange_rate}`
          : "Failed to fetch exchange rate"}
      </p>
    </div>
  );
}
