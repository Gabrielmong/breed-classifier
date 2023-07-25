import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { appReducer, settingsReducer } from 'state/slices';

const rootReducer = combineReducers({
  app: appReducer,
  settings: settingsReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const middlewareConfig = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
  immutableCheck: true,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(middlewareConfig),
});

export const persistor = persistStore(store);
