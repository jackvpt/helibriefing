// 🏪 Redux store
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage" // localStorage

// 🧩 Slices
import userReducer, { clearUser } from "./features/userSlice"
import settingsReducer from "./features/settingsSlice"
import weightBalanceReducer from "./features/weightBalanceSlice"

// 🔗 Combine all reducers
const appReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  weightBalance: weightBalanceReducer,
})

// 🚪 Root reducer: wipes the whole state on logout
// Passing `undefined` makes every slice fall back to its initial state,
// so no data from the previous user can leak to the next one.
// redux-persist then overwrites the persisted "user" slice with the empty one.
const rootReducer = (state, action) => {
  if (action.type === clearUser.type) {
    state = undefined
  }
  return appReducer(state, action)
}

// 💾 Persist config
const persistConfig = {
  key: "root",
  version: 1, // bump when the shape of the persisted state changes
  storage,
  blacklist: [], // do not persist these slices
  whitelist: ["user", "settings", "weightBalance"], // only persist these slices
}

// 🔁 Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// 🏪 Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Actions dispatched by redux-persist carry non-serializable values
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// 💾 Persistor (consumed by <PersistGate> in main.jsx)
export const persistor = persistStore(store)
