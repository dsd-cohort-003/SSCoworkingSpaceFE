import { configureStore } from '@reduxjs/toolkit';
import officeReservationReducer from './slices/officeSlice';
export const store = configureStore({
  reducer: {
    officeReservation: officeReservationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
