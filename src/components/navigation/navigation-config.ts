interface NavigationConfigItem {
  id: string;
  label: string;
  href: string;
}
export const navigationConfig: NavigationConfigItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "exchange-rate",
    label: "Exchange rate",
    href: "/exchange-rate",
  },
  {
    id: "currency-converter",
    label: "Currency Converter",
    href: "/currency-converter",
  },
];
