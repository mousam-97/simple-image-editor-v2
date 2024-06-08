import React from "react";
import { DashBoardRightPanel } from "../../../ui/dashboard/Dashboard";
import { RangeInput } from "../../../ui/input/Input";
import { Row, Space } from "../../../ui/grid/Grid";
import Button from "../../../ui/button/Button";
import Text, { TEXT_BOLDNESS } from "../../../ui/text/Text";
import PhotoEditorImageOverlay from "./image-overlay/PhotoEditorImageOverlay";

type Props = {};

export default function PhotoEditorRightDashboard({}: Props) {
  return (
    <DashBoardRightPanel>
      <div style={{ width: "80%" }}>
        <Row columnDirection>
          <Row spaceBetween vCenter>
            <Text boldness={TEXT_BOLDNESS.BOLD}>Filters</Text>
            <Button onClick={() => console.log("reset")}>Reset</Button>
          </Row>
          <Space vertical size={26} />
          <Row wrap spaceBetween>
            <Space size={40}>
              <RangeInput name="brightness" value={50} />
            </Space>
            <Space size={40}>
              <RangeInput name="saturate" value={50} />
            </Space>
            <Space size={40}>
              <RangeInput name="contrast" value={50} />
            </Space>
            <Space size={40}>
              <RangeInput name="sepia" value={50} />
            </Space>
            <Space size={40}>
              <RangeInput name="black/white" value={50} />
            </Space>
          </Row>
        </Row>
        <Space size={40} vertical/>
        <PhotoEditorImageOverlay />
      </div>
    </DashBoardRightPanel>
  );
}
