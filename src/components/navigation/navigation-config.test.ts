import { navigationConfig } from "./navigation-config";

describe("Navigation Configuration", () => {
  it("should have a home page", () => {
    const homeItem = navigationConfig.find((item) => item.id === "home");
    expect(homeItem).toBeDefined();
    expect(homeItem?.href).toBe("/");
  });

  it("should have an exchange rate page", () => {
    const exchangeRateItem = navigationConfig.find(
      (item) => item.id === "exchange-rate"
    );
    expect(exchangeRateItem).toBeDefined();
    expect(exchangeRateItem?.href).toBe("/exchange-rate");
  });

  it("should have a currency converter page", () => {
    const converterItem = navigationConfig.find(
      (item) => item.id === "currency-converter"
    );
    expect(converterItem).toBeDefined();
    expect(converterItem?.href).toBe("/currency-converter");
  });
});
