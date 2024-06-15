import React from "react";
import { Row, Space } from "../../../../ui/grid/Grid";
import Image from "../../../../ui/image/Image";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  allImagesSelector,
  currentImageIdSelector,
  imageDataByIdSelector,
  setCurrentImage,
} from "../../PhotoEditorSlice";
import { getCSSFilterStringFromFiltersData } from "../../photoEditorService";
import Button, { BUTTON_STYLE } from "../../../../ui/button/Button";

type SavedImageItemProps = {
  imageId: string;
};

function SavedImageItem(props: SavedImageItemProps) {
  const { imageId } = props;
  const imageData = useAppSelector(imageDataByIdSelector(imageId));
  const dispatch = useAppDispatch();

  const { imageUrl, filters } = imageData || {};

  const filterString = getCSSFilterStringFromFiltersData(filters);

  function handleClick() {
    dispatch(setCurrentImage(imageId));
  }

  return (
    <Space size={8}>
      <Button type={BUTTON_STYLE.RESET} onClick={handleClick}>
        <Image
          src={imageUrl}
          alt="editor-photo"
          cssStyles={{
            width: 100,
            height: 100,
            borderRadius: "15px",
            objectFit: "cover",
            filter: filterString,
          }}
        />
      </Button>
    </Space>
  );
}

type Props = {};

export default function PhotoEditorSavedImages({}: Props) {
  const allImages = useAppSelector(allImagesSelector);
  const currentImageId = useAppSelector(currentImageIdSelector);

  const savedImages = Object.keys(allImages).filter(
    (id) => id !== currentImageId
  );

  return (
    <Row wrap cssStyle={{ width: "100%", gap: "20px" }}>
      {savedImages.map((imageId) => (
        <SavedImageItem key={imageId} imageId={imageId} />
      ))}
    </Row>
  );
}
