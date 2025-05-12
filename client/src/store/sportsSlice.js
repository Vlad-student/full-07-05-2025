import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllSports, fetchSportById, fetchCreateSport } from "../api";

export const fetchCreateSportAsync = createAsyncThunk(
  "sports/fetchCreateSportAsync",
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

const pendCase = (state) => {
  state.isLoading = true;
  state.error = null;
};
const rejectedCase = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
};

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
    });
    builder.addCase(fetchAllSportsAsync.rejected, rejectedCase);

    builder.addCase(fetchSportByIdAsync.pending, pendCase);
    builder.addCase(fetchSportByIdAsync.fulfilled, (state, action) => {
      state.selectedSport = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchSportByIdAsync.rejected, rejectedCase);

    builder.addCase(fetchCreateSportAsync.pending, pendCase);
    builder.addCase(fetchCreateSportAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.createdSport = action.payload;
    });
    builder.addCase(fetchCreateSportAsync.rejected, rejectedCase);
  },
});

export default sportsSlice.reducer;
