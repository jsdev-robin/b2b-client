import { createSlice } from '@reduxjs/toolkit';
import { productDraftApi } from './productDraftApi';
import { ProductDraft } from './types';

interface DraftState {
  payload: ProductDraft | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: DraftState = {
  payload: null,
  isLoading: false,
  isError: false,
};

export const draftSlice = createSlice({
  name: 'productDraft',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(productDraftApi.endpoints.findDraft.matchPending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addMatcher(
        productDraftApi.endpoints.findDraft.matchFulfilled,
        (state, { payload }) => {
          state.payload = payload.payload.draft;
          state.isLoading = false;
          state.isError = false;
        },
      )
      .addMatcher(
        productDraftApi.endpoints.findDraft.matchRejected,
        (state) => {
          state.isLoading = false;
          state.isError = true;
        },
      );
  },
});

export default draftSlice.reducer;
