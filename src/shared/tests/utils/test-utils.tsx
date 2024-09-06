import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "app/providers/StoreProvider";
import { PropsWithChildren } from "react";
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

export function renderWithProviders(ui: React.ReactElement, { preloadedState = {}, ...renderOptions } = {}) {
  const store = configureStore({
    reducer:rootReducer,
    preloadedState
  })
  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
