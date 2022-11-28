import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import currencyReducer from "./features/currencySlice";
import cartReducer from "./features/cartSlice";
import dataReducer from "./features/modalSlice";
import productReducer from "./features/productDescriptionSlice";
import modalReducer from "./features/modalSlice";

const rootReducers = combineReducers({
  currencies: currencyReducer,
  cart: cartReducer,
  data: dataReducer,
  product: productReducer,
  modal: modalReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
