import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Button from "../../../ui/button/Button";
import { DashBoardRightPanel } from "../../../ui/dashboard/Dashboard";
import { Row, Space } from "../../../ui/grid/Grid";
import Icon, { ICON_SIZE } from "../../../ui/icon/Icon";
import { RangeInput } from "../../../ui/input/Input";
import Text, { TEXT_BOLDNESS } from "../../../ui/text/Text";
import {
  currentImageDataSelector,
  resetCurrentImageFilter,
  updateCurrentImageFilter,
} from "../PhotoEditorSlice";
import {
  MAX_FILTER_VALUE,
  MIN_FILTER_VALUE,
  PHOTO_EDITOR_FILTER_DATA,
} from "../photoEditorService";
import PhotoEditorImageOverlay from "./image-overlay/PhotoEditorImageOverlay";

type Props = {};

export default function PhotoEditorRightDashboard({}: Props) {
  const currentImageData = useAppSelector(currentImageDataSelector);
  const dispatch = useAppDispatch();

  const { id, filters } = currentImageData || {};

  function handleFilterChange(e) {
    const name = e.target.name;
    const value = Number(e.target.value);

    dispatch(updateCurrentImageFilter({ name, value }));
  }

  function handleResetFilters() {
    dispatch(resetCurrentImageFilter());
  }

  return (
    <DashBoardRightPanel>
      <div style={{ width: "90%" }}>
        <Row columnDirection>
          <Row spaceBetween vCenter>
            <Row vCenter>
              <Icon name="editor" size={ICON_SIZE.MD} />
              <Space size={8} />
              <Text boldness={TEXT_BOLDNESS.BOLD}>Filters</Text>
            </Row>
            <Button onClick={handleResetFilters}>Reset</Button>
          </Row>
          <Space vertical size={26} />
          {filters && (
            <Row wrap spaceAround>
              {Object.values(PHOTO_EDITOR_FILTER_DATA).map((filter) => (
                <Space size={26} key={filter.id}>
                  <RangeInput
                    name={filter.id}
                    value={filters?.[filter.id]}
                    onChange={handleFilterChange}
                    min={MIN_FILTER_VALUE}
                    max={MAX_FILTER_VALUE}
                  />
                </Space>
              ))}
            </Row>
          )}
        </Row>
        <Space size={40} vertical />
        <PhotoEditorImageOverlay />
      </div>
    </DashBoardRightPanel>
  );
}
