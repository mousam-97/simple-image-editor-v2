import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Button from "../../../ui/button/Button";
import { DashBoardLeftPanel } from "../../../ui/dashboard/Dashboard";
import DragAndDropContainer from "../../../ui/drag-and-drop-container/DragAndDropContainer";
import { Row, Space } from "../../../ui/grid/Grid";
import Image from "../../../ui/image/Image";
import Input from "../../../ui/input/Input";
import LoadingSpinner, {
  LOADING_SPINNER_SIZE,
} from "../../../ui/loading-spinner/LoadingSpinner";
import Text from "../../../ui/text/Text";
import {
  currentImageDataSelector,
  fetchRandomImageFromServer,
  imageEditorErrorSelector,
  isImageEditorImageLoadingSelector,
  updateCurrentImageName,
  updateCurrentWatermark,
} from "../PhotoEditorSlice";
import { getCSSFilterStringFromFiltersData } from "../photoEditorService";
import PhotoEditorSavedImages from "./saved-images/PhotoEditorSavedImages";

type Props = {};

export default function PhotoEditorLeftDashboard({}: Props) {
  const dispatch = useAppDispatch();
  const currentImageData = useAppSelector(currentImageDataSelector);

  const { imageUrl, name, watermark, filters } = currentImageData || {};
  const { content: watermarkText, position: watermarkPosition } =
    watermark || {};

  const filterString = getCSSFilterStringFromFiltersData(filters);
  const isImageLoading = useAppSelector(isImageEditorImageLoadingSelector);
  const error = useAppSelector(imageEditorErrorSelector);

  function handleNameChange(e) {
    const value = e.target.value;
    dispatch(updateCurrentImageName(value));
  }

  function handleWatermarkPositionChange(newPosition: {
    top: number;
    left: number;
  }) {
    dispatch(
      updateCurrentWatermark({
        content: watermarkText || "",
        position: newPosition,
      })
    );
  }

  return (
    <DashBoardLeftPanel>
      <Row columnDirection vCenter center fullHeight>
        <Row spaceBetween vCenter wrap>
          <Input
            name="image-name"
            type="text"
            placeHolder="Untitled image"
            value={name || ""}
            onChange={handleNameChange}
          />
          <Space size={16} />
          <Button
            onClick={() => dispatch(fetchRandomImageFromServer())}
            isLoading={isImageLoading}
          >
            New
          </Button>
        </Row>
        <Space size={16} vertical />
        <div
          style={{
            height: "570px",
          }}
        >
          {(() => {
            if (error) {
              return <Text>{error.message}</Text>;
            }

            if (isImageLoading) {
              return (
                <Row center vCenter fullHeight>
                  <LoadingSpinner size={LOADING_SPINNER_SIZE.LG} />
                </Row>
              );
            }

            return (
              <DragAndDropContainer
                dragElementPosition={watermarkPosition}
                dragElement={<Text>{watermarkText}</Text>}
                onChange={handleWatermarkPositionChange}
              >
                <Image
                  src={imageUrl}
                  alt="editor-photo"
                  cssStyles={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: filterString,
                  }}
                />
              </DragAndDropContainer>
            );
          })()}
        </div>
        <Space vertical size={26} />
        <PhotoEditorSavedImages />
      </Row>
    </DashBoardLeftPanel>
  );
}
