import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Button from "../../../ui/button/Button";
import { DashBoardLeftPanel } from "../../../ui/dashboard/Dashboard";
import { Row, Space } from "../../../ui/grid/Grid";
import Image from "../../../ui/image/Image";
import Input from "../../../ui/input/Input";
import Text from "../../../ui/text/Text";
import {
  currentImageDataSelector,
  fetchRandomImageFromServer,
  updateCurrentImageName,
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

  function handleNameChange(e) {
    const value = e.target.value;
    dispatch(updateCurrentImageName(value));
  }

  return (
    <DashBoardLeftPanel>
      <Row columnDirection vCenter center fullHeight>
        <Row spaceBetween vCenter>
          <Input
            name="image-name"
            type="text"
            placeHolder="Untitled image"
            value={name || ""}
            onChange={handleNameChange}
          />
          <Space size={16} />
          <Button onClick={() => dispatch(fetchRandomImageFromServer())}>
            New
          </Button>
        </Row>
        <Space size={16} vertical />
        <div style={{ position: "relative" }}>
          <Image
            src={imageUrl}
            alt="editor-photo"
            cssStyles={{
              maxWidth: "100%",
              height: 'auto',
              borderRadius: "10px",
              objectFit: "contain",
              filter: filterString,
            }}
          />
          {watermarkText && (
            <Text
              cssStyle={{
                position: "absolute",
                color: "white",
                border: "1px solid gray",
                cursor: 'grab',
                ...watermarkPosition,
              }}
            >
              {watermarkText}
            </Text>
          )}
        </div>
        <Space vertical size={16} />
        <PhotoEditorSavedImages />
      </Row>
    </DashBoardLeftPanel>
  );
}
