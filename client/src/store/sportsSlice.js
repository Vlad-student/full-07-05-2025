import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllSports,
  fetchSportById,
  fetchCreateSport,
  deleteSportById,
  updateSportById,
} from "../api";
import { pendCase, rejectedCase } from "./helpers";

export const updateSportByIdAsync = createAsyncThunk(
  "sports/updateSportById",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await updateSportById({ id, formData });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const deleteSportByIdAsync = createAsyncThunk(
  "sports/deleteSportById",
  async (id, thunkAPI) => {
    try {
      const response = await deleteSportById(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const fetchCreateSportAsync = createAsyncThunk(
  "sports/fetchCreateSport",
  async (formData, thunkAPI) => {
    try {
      const response = await fetchCreateSport(formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const fetchSportByIdAsync = createAsyncThunk(
  "sports/fectchSportById",
  async (id, thunkAPI) => {
    try {
      const response = await fetchSportById(id);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const fetchAllSportsAsync = createAsyncThunk(
  "sports/fetchAllSports",
  async (values, thunkAPI) => {
    try {
      const response = await fetchAllSports();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const sportsSlice = createSlice({
  name: "sports",
  initialState: {
    sports: [],
    selectedSport: null,
    createdSport: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSportsAsync.pending, pendCase);
    builder.addCase(fetchAllSportsAsync.fulfilled, (state, action) => {
      state.sports = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchAllSportsAsync.rejected, rejectedCase);

    builder.addCase(fetchSportByIdAsync.pending, pendCase);
    builder.addCase(fetchSportByIdAsync.fulfilled, (state, action) => {
      state.selectedSport = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchSportByIdAsync.rejected, rejectedCase);

    builder.addCase(fetchCreateSportAsync.pending, pendCase);
    builder.addCase(fetchCreateSportAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.createdSport = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCreateSportAsync.rejected, rejectedCase);

    builder.addCase(deleteSportByIdAsync.pending, pendCase);
    builder.addCase(deleteSportByIdAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sports = state.sports.filter(
        (sport) => sport._id !== action.payload._id
      );
      state.error = null;
    });
    builder.addCase(deleteSportByIdAsync.rejected, rejectedCase);

    builder.addCase(updateSportByIdAsync.pending, pendCase);
    builder.addCase(updateSportByIdAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedSport = action.payload;
    });
    builder.addCase(updateSportByIdAsync.rejected, rejectedCase);
  },
});

export default sportsSlice.reducer;
