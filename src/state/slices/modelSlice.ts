import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AppState =
  | 'loadingModel'
  | 'modelReady'
  | 'imageReady'
  | 'identifying'
  | 'complete';
export type Result = {
  className: string;
  probability: number;
};
type ModelSliceState = {
  results: Result[];
  imageURL: string | undefined;
  model: any;
  appState: AppState;
};

const initialState: ModelSliceState = {
  results: [],
  imageURL: undefined,
  model: undefined,
  appState: 'loadingModel',
};

const modelSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setResults: (state: ModelSliceState, action: PayloadAction<Result[]>) => {
      state.results = action.payload;
    },
    setImageURL: (
      state: ModelSliceState,
      action: PayloadAction<string | undefined>,
    ) => {
      state.imageURL = action.payload;
    },
    setModel: (state: ModelSliceState, action: PayloadAction<any>) => {
      state.model = action.payload;
    },
    setModelState: (
      state: ModelSliceState,
      action: PayloadAction<AppState>,
    ) => {
      state.appState = action.payload;
    },
  },
});

export const { setResults, setImageURL, setModel, setModelState } =
  modelSlice.actions;

export const appReducer = modelSlice.reducer;

export const selectResults = (state: { app: ModelSliceState }) => state.app;
