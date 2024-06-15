import React from "react";
import Text, { TEXT_BOLDNESS } from "../../../../ui/text/Text";
import Input from "../../../../ui/input/Input";
import { Row, Space } from "../../../../ui/grid/Grid";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  currentImageDataSelector,
  updateCurrentWatermark,
} from "../../PhotoEditorSlice";
import Icon, { ICON_SIZE } from "../../../../ui/icon/Icon";

type Props = {};

export default function PhotoEditorImageOverlay({}: Props) {
  const dispatch = useAppDispatch();
  const currentImageData = useAppSelector(currentImageDataSelector);
  const watermarkText = currentImageData?.watermark?.content;

  function handleUpdateWatermark(e) {
    const watermark = {
      content: e.target.value,
      position: {
        top: 90,
        left: 90,
      },
    };
    dispatch(updateCurrentWatermark(watermark));
  }

  return (
    <>
      <Row vCenter>
        <Icon name="text_editor" size={ICON_SIZE.MD} />

        <Space size={8} />
        <Text boldness={TEXT_BOLDNESS.BOLD}>Text</Text>
      </Row>
      <Space vertical size={16} />
      <Text cssStyle={{ fontSize: "1rem" }} boldness={TEXT_BOLDNESS.SEMI_BOLD}>
        Content
      </Text>
      <Input
        name="image_overlay"
        placeHolder="Image overlay"
        type="text"
        value={watermarkText}
        onChange={handleUpdateWatermark}
      />
    </>
  );
}
