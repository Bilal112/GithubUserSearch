import {configureStore} from '@reduxjs/toolkit';
//redux-persist

// Reducers
import userReducer from './actions/userSlice';


export const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
