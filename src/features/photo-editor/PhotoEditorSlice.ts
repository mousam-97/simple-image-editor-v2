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
  PhotoEditorWatermarkType,
} from "./photoEditorService";

type PhotoEditorImageType = {
  id: string;
  imageUrl: string;
  name: string;
  watermark?: PhotoEditorWatermarkType;
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

// .then way
// export const fetchRandomImageFromServer = createAsyncThunk(
//   "photo_editor/fetch_image",
//   (_, thunkAPI) => {
//     const { dispatch } = thunkAPI;

//     return fetchRandomImage()
//       .then((blobImage) => {
//         const imageUrl = getImageUrlFromBlob(blobImage);
//         const id = uuidv4();
//         const data: PhotoEditorImageType = {
//           id,
//           imageUrl,
//           name: "Untitled image",
//           filters: getDefaultPhotoEditorFilterValues(),
//         };

//         return data;
//       })
//       .catch((e) => Promise.reject(new Error('something went wrong')));
//   }
// );

// using async await
export const fetchRandomImageFromServer = createAsyncThunk(
  "photo_editor/fetch_image",
  async (_, thunkAPI) => {
    const response = await fetchRandomImage();
    const imageUrl = getImageUrlFromBlob(response);
    const id = uuidv4();
    const data: PhotoEditorImageType = {
      id,
      imageUrl,
      name: "Untitled image",
      filters: getDefaultPhotoEditorFilterValues(),
    };

    return data;
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

    updateCurrentWatermark: (
      state,
      action: PayloadAction<PhotoEditorWatermarkType>
    ) => {
      const currentImageId = state.currentImageId;
      const currentImageData = state.entities[currentImageId];

      currentImageData.watermark = action.payload;
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
      .addCase(fetchRandomImageFromServer.rejected, (state, action) => {
        const errorData = action.error;
        // @ts-ignore
        state.error = errorData;
        state.status = "failed";
      });
  },
});

export const {
  setCurrentImage,
  updateCurrentImageFilter,
  updateCurrentImageName,
  resetCurrentImageFilter,
  updateCurrentWatermark,
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

export const isImageEditorImageLoadingSelector = createSelector(
  photoEditorSelector,
  (state) => state.status === "loading"
);

export const imageEditorErrorSelector = createSelector(
  photoEditorSelector,
  (state) => (state.status === "failed" ? state.error : undefined)
);

export default photoEditorSlice.reducer;
