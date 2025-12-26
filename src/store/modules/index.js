import { apiErrorSlice } from "./apiErrorHandler";

export const rootReducer = {
  apiErrorReducer: apiErrorSlice.reducer,
};
