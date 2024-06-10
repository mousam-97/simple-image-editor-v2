import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Button from "../../../ui/button/Button";
import { DashBoardLeftPanel } from "../../../ui/dashboard/Dashboard";
import { Row, Space } from "../../../ui/grid/Grid";
import Image from "../../../ui/image/Image";
import Input from "../../../ui/input/Input";
import {
  currentImageDataSelector,
  fetchRandomImageFromServer,
} from "../PhotoEditorSlice";
import { getCSSFilterStringFromFiltersData } from "../photoEditorService";
import PhotoEditorSavedImages from "./saved-images/PhotoEditorSavedImages";

type Props = {};

export default function PhotoEditorLeftDashboard({}: Props) {
  const dispatch = useAppDispatch();
  const currentImageData = useAppSelector(currentImageDataSelector);

  const { imageUrl, name, watermark, filters } = currentImageData || {};

  const filterString = getCSSFilterStringFromFiltersData(filters);

  return (
    <DashBoardLeftPanel>
      <Row columnDirection vCenter center fullHeight>
        <Row spaceBetween vCenter>
          <Input
            name="image-name"
            type="text"
            placeHolder="Untitled image"
            value={name || ""}
          />
          <Space size={16} />
          <Button onClick={() => dispatch(fetchRandomImageFromServer())}>
            New
          </Button>
        </Row>
        <Space size={16} vertical />
        <Image
          src={imageUrl}
          alt="editor-photo"
          cssStyles={{
            width: 400,
            height: 400,
            borderRadius: "10px",
            objectFit: "contain",
            filter: filterString,
          }}
        />
        <Space vertical size={16} />
        <PhotoEditorSavedImages />
      </Row>
    </DashBoardLeftPanel>
  );
}
