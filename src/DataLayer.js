import React, { createContext, useContext, useReducer } from "react";

export const DataLayerContext = createContext();

// The children is whats inside DataLayer (go to index.js, children is <App />)
export const DataLayer = ({ initialState, reducer, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);

export const useDataLayerValue = () => useContext(DataLayerContext);
