import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { gatewayApi } from './features/api/gatewayApi';
import authSlice from './features/auth/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [gatewayApi.reducerPath]: gatewayApi.reducer,
      auth: authSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(gatewayApi.middleware),
  });
};

const store = makeStore();
setupListeners(store.dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
