import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { createTestStore, type TestStore } from "./createTestStore";

export const renderWithProviders = (ui: React.ReactElement, store?: TestStore) => {
  const testStore = store ?? createTestStore();

  return render(
    <Provider store={testStore}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};
