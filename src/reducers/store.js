import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import { CLEAR_PERSISTED_STATE } from '../actions/clearState';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
};

const appReducer = (state, action) => {
  if (action.type === CLEAR_PERSISTED_STATE) {
    storage.removeItem('persist:root');
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, appReducer);

// Store configuration
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
    // Ignore these action types from redux-persist as they may contain non-serializable data
      ignoredActions: [
        'persist/PERSIST',
        'persist/REHYDRATE',
        'persist/PAUSE',
        'persist/PURGE',
        'persist/REGISTER',
        'persist/FLUSH',
      ],
    },
  }),
});

export const persistor = persistStore(store); // This creates a persistor object based on store
export default store;
