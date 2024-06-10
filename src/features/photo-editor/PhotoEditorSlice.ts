import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";
import { fetchRandomImage } from "../../service/ImageService";
import { getImageUrlFromBlob } from "../../utils/imageUtils";
import {
  getDefaultPhotoEditorFilterValues,
  PhotoEditorFilterType,
} from "./photoEditorService";

type PhotoEditorImageType = {
  id: string;
  imageUrl: string;
  name: string;
  watermark: string;
  filters: PhotoEditorFilterType;
};

export interface PhotoEditorState {
  currentImageId: string;
  entities: Record<string, PhotoEditorImageType>;
  status: "idle" | "loading" | "failed";
  error: Record<any, any> | null;
}

const initialState: PhotoEditorState = {
  currentImageId: "",
  entities: {},
  status: "idle",
  error: null,
};

export const fetchRandomImageFromServer = createAsyncThunk(
  "photo_editor/fetch_image",
  (_, thunkAPI) => {
    const { dispatch } = thunkAPI;

    return fetchRandomImage()
      .then((blobImage) => {
        const imageUrl = getImageUrlFromBlob(blobImage);
        const id = uuidv4();
        const data: PhotoEditorImageType = {
          id,
          imageUrl,
          name: "Untitled image",
          watermark: "",
          filters: getDefaultPhotoEditorFilterValues(),
        };

        return data;
      })
      .catch((e) => e);
  }
);

export const photoEditorSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCurrentImage: (state, action: PayloadAction<string>) => {
      state.currentImageId = action.payload;
    },

    addImages: (state, action: PayloadAction<PhotoEditorImageType>) => {
      const imageData = action.payload;
      state.entities[imageData.id] = imageData;
    },

    updateCurrentImageFilter: (
      state,
      action: PayloadAction<{ name: string; value: number }>
    ) => {
      const { name, value } = action.payload;
      const { currentImageId } = state;

      const currentImageData = state.entities[currentImageId];
      currentImageData.filters[name] = value;
    },

    resetCurrentImageFilter: (state) => {
      const { currentImageId } = state;

      const currentImageData = state.entities[currentImageId];
      currentImageData.filters = getDefaultPhotoEditorFilterValues();
    },

    updateCurrentImageName: (state, action: PayloadAction<string>) => {
      const currentImageId = state.currentImageId;
      state.entities[currentImageId].name = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomImageFromServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRandomImageFromServer.fulfilled,
        (state, action: PayloadAction<PhotoEditorImageType>) => {
          const imageData = action.payload;
          state.entities[imageData.id] = imageData;
          state.currentImageId = imageData.id;
          state.status = "idle";
        }
      )
      .addCase(
        fetchRandomImageFromServer.rejected,
        (state, action: PayloadAction<Error | any>) => {
          state.error = action.payload;
          state.status = "failed";
        }
      );
  },
});

export const {
  setCurrentImage,
  updateCurrentImageFilter,
  updateCurrentImageName,
  resetCurrentImageFilter,
} = photoEditorSlice.actions;

const photoEditorSelector = (state: RootState) => state.photoEditor;

export const currentImageIdSelector = createSelector(
  photoEditorSelector,
  (state) => state.currentImageId
);

export const allImagesSelector = createSelector(
  photoEditorSelector,
  (state) => state.entities
);

export const currentImageDataSelector = createSelector(
  allImagesSelector,
  currentImageIdSelector,
  (images, currentImageId) => images[currentImageId]
);

export const imageDataByIdSelector = (id: string) =>
  createSelector(allImagesSelector, (images) => images[id]);

export default photoEditorSlice.reducer;
