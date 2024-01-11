import { createContext, useState } from "react";

export const CurrencyContext = createContext({});

export function CurrencyContextProvider({ children }) {
  const currencies = ["$", "€", "£"];
  const [currency, setCurrency] = useState("$");

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
}
