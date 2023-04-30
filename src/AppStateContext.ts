import { createContext } from "react";

export const initialAppStateContext = {
  loading: false,
};

export const AppStateContext = createContext(initialAppStateContext);
