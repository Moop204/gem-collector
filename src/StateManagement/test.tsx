const Cities = ["Amsterdam", "London", "Madrid"];

export const createStore = () => {
  const store = {
    get allCities() {
      return Cities;
    },
  };

  return store;
};

export type TStore = ReturnType<typeof createStore>;

import React, { createContext, FunctionComponent } from "react";
import { useLocalStore } from "mobx-react-lite";
import { Engine } from "../Engine/Engine";

export const storeContext = React.createContext<TStore | null>(null);

// export const StoreProvider: FunctionComponent = ({ children }) => {
//   const store = useLocalStore(createStore);
//   return <storeContext.Provider />;
//   return (
//     <storeContext.Provider value={store}>{children}</storeContext.Provider>
//   );
// };

const defaultState = {
  dark: false,
};

interface IThemeContext {
  dark: boolean;
  toggleDark?: () => void;
}

const ThemeContext = createContext<Engine>(new Engine());

const TestComponent = () => {
  return (
    <ThemeContext.Provider
      value={{ dark: false, toggleDark: () => console.log("toggle") }}
    ></ThemeContext.Provider>
  );
};
