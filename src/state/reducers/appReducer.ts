import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AppState =
  | 'loadingModel'
  | 'modelReady'
  | 'imageReady'
  | 'identifying'
  | 'complete';
type Result = {
  className: string;
  probability: number;
};
type AppSliceState = {
  results: Result[];
  imageURL: string | undefined;
  model: any;
  appState: AppState;
};

const initialState: AppSliceState = {
  results: [],
  imageURL: undefined,
  model: undefined,
  appState: 'loadingModel',
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setResults: (state: AppSliceState, action: PayloadAction<Result[]>) => {
      state.results = action.payload;
    },
    setImageURL: (
      state: AppSliceState,
      action: PayloadAction<string | undefined>,
    ) => {
      state.imageURL = action.payload;
    },
    setModel: (state: AppSliceState, action: PayloadAction<any>) => {
      state.model = action.payload;
    },
    setAppState: (state: AppSliceState, action: PayloadAction<AppState>) => {
      state.appState = action.payload;
    },
  },
});

export const { setResults, setImageURL, setModel, setAppState } =
  appSlice.actions;

export default appSlice.reducer;

export const selectResults = (state: { app: AppSliceState }) => state.app;
