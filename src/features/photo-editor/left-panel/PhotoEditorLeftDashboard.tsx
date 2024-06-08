import React from "react";
import { DashBoardLeftPanel } from "../../../ui/dashboard/Dashboard";
import { Row, Space } from "../../../ui/grid/Grid";
import Button from "../../../ui/button/Button";
import Image from "../../../ui/image/Image";
import Input from "../../../ui/input/Input";

type Props = {};

export default function PhotoEditorLeftDashboard({}: Props) {
  return (
    <DashBoardLeftPanel>
      <Row columnDirection vCenter center fullHeight>
        <Row spaceBetween vCenter>
          <Input name="image-name" type="text" placeHolder="Untitled image" />
          <Space size={16} />
          <Button onClick={() => console.log("hello")}>New</Button>
        </Row>
        <Space size={16} vertical />
        <Image
          src="https://www.adobe.com/acrobat/hub/media_173d13651460eb7e12c0ef4cf8410e0960a20f0ee.jpeg?width=750&format=jpeg&optimize=medium"
          alt="editor-photo"
          cssStyles={{
            width: 400,
            height: 400,
            borderRadius: "10px",
            objectFit: "contain",
          }}
        />
      </Row>
    </DashBoardLeftPanel>
  );
}
