import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchItemsThunk, type PokemonListItem } from "./itemsThunks";

type ItemsState = {
  items: PokemonListItem[];
  loading: boolean;
  error: string | null;
};

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    clearItems: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItemsThunk.fulfilled, (state, action: PayloadAction<PokemonListItem[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchItemsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? "Error desconocido";
      });
  },
});

export const { clearItems } = itemsSlice.actions;
export default itemsSlice.reducer;
