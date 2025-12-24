import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../services/api/request";

export type PokemonListItem = { name: string; url: string };

type PokemonListResponse = {
  results: PokemonListItem[];
};

export const fetchItemsThunk = createAsyncThunk(
  "items/fetch",
  async (payload: { limit: number }) => {
    const data = await request<PokemonListResponse>("list_items", payload);
    return data.results;
  }
);
