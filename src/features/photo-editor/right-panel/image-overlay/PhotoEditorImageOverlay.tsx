import React from "react";
import Text, { TEXT_BOLDNESS } from "../../../../ui/text/Text";
import Input from "../../../../ui/input/Input";
import { Space } from "../../../../ui/grid/Grid";

type Props = {};

export default function PhotoEditorImageOverlay({}: Props) {
  return (
    <div>
      <Text boldness={TEXT_BOLDNESS.BOLD}>Text</Text>
      <Space vertical size={16} />
      <Text cssStyle={{ fontSize: "1rem" }} boldness={TEXT_BOLDNESS.SEMI_BOLD}>Content</Text>
      <Input name="image_overlay" placeHolder="Image overlay" type="text" />
    </div>
  );
}
