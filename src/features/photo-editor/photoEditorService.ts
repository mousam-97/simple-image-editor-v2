export enum PHOTO_EDITOR_FILTER_ID {
  BRIGHTNESS = "brightness",
  SATURATE = "saturate",
  CONTRAST = "contrast",
  SEPIA = "sepia",
  BLACK_WHITE = "black_white",
}

export type PhotoEditorFilterType = Record<PHOTO_EDITOR_FILTER_ID, number>;
export type PhotoEditorWatermarkType = {
  content: string;
  position: { top: number; left: number };
};

export const PHOTO_EDITOR_FILTER_DATA: Record<
  PHOTO_EDITOR_FILTER_ID,
  { id: PHOTO_EDITOR_FILTER_ID; label: string; cssFilterName: string }
> = {
  [PHOTO_EDITOR_FILTER_ID.BRIGHTNESS]: {
    id: PHOTO_EDITOR_FILTER_ID.BRIGHTNESS,
    label: "Brightness",
    cssFilterName: "brightness",
  },
  [PHOTO_EDITOR_FILTER_ID.SATURATE]: {
    id: PHOTO_EDITOR_FILTER_ID.SATURATE,
    label: "Saturate",
    cssFilterName: "saturate",
  },
  [PHOTO_EDITOR_FILTER_ID.CONTRAST]: {
    id: PHOTO_EDITOR_FILTER_ID.CONTRAST,
    label: "Contrast",
    cssFilterName: "contrast",
  },
  [PHOTO_EDITOR_FILTER_ID.SEPIA]: {
    id: PHOTO_EDITOR_FILTER_ID.SEPIA,
    label: "Sepia",
    cssFilterName: "sepia",
  },
  [PHOTO_EDITOR_FILTER_ID.BLACK_WHITE]: {
    id: PHOTO_EDITOR_FILTER_ID.BLACK_WHITE,
    label: "Black and white",
    cssFilterName: "grayscale",
  },
};

export const MIN_FILTER_VALUE = 0;
export const MAX_FILTER_VALUE = 100;

export function getDefaultPhotoEditorFilterValues() {
  return {
    [PHOTO_EDITOR_FILTER_ID.BRIGHTNESS]: 90,
    [PHOTO_EDITOR_FILTER_ID.SATURATE]: 90,
    [PHOTO_EDITOR_FILTER_ID.CONTRAST]: 90,
    [PHOTO_EDITOR_FILTER_ID.SEPIA]: 0,
    [PHOTO_EDITOR_FILTER_ID.BLACK_WHITE]: 0,
  };
}

export function getCSSFilterStringFromFiltersData(
  filters: PhotoEditorFilterType
): string {
  if (!filters) return "";

  const filterString = Object.entries(filters).reduce(
    (acc, [key, value]) =>
      acc +
      `${
        PHOTO_EDITOR_FILTER_DATA[key as PHOTO_EDITOR_FILTER_ID].cssFilterName
      }(${value}%) `,
    ""
  );

  return filterString;
}
