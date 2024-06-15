import React, { useState, useRef } from "react";
import Image from "../../../../ui/image/Image";
import Text from "../../../../ui/text/Text";
import {
  currentImageDataSelector,
  imageDataByIdSelector,
  updateCurrentWatermark,
} from "../../PhotoEditorSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getCSSFilterStringFromFiltersData } from "../../photoEditorService";

export default function PhotoEditorDragAndDropContainer() {
  const currentImageData = useAppSelector(currentImageDataSelector);
  const dispatch = useAppDispatch();

  const { imageUrl, name, watermark, filters } = currentImageData || {};
  const { content: watermarkText, position: watermarkPosition } =
    watermark || {};

  const filterString = getCSSFilterStringFromFiltersData(filters);
  const containerRef = useRef(null);
  const elementRef = useRef(null);

  const handleDragStart = (e) => {
    const element = e.target;
    const rect = element.getBoundingClientRect();
    e.dataTransfer.setData("offsetX", e.clientX - rect.left);
    e.dataTransfer.setData("offsetY", e.clientY - rect.top);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const offsetX = e.dataTransfer.getData("offsetX");
    const offsetY = e.dataTransfer.getData("offsetY");

    // @ts-ignore
    const containerRect = containerRef.current.getBoundingClientRect();
    // @ts-ignore
    const elementRect = elementRef.current.getBoundingClientRect();

    const newLeft = e.clientX - containerRect.left - offsetX;
    const newTop = e.clientY - containerRect.top - offsetY;

    const newPosition = {
      left: Math.max(
        0,
        Math.min(newLeft, containerRect.width - elementRect.width)
      ),
      top: Math.max(
        0,
        Math.min(newTop, containerRect.height - elementRect.height)
      ),
    };

    dispatch(
      updateCurrentWatermark({
        content: watermarkText || "",
        position: newPosition,
      })
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
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
      {watermarkText && (
        <div
          ref={elementRef}
          style={{
            position: "absolute",
            zIndex: 100,
            color: "white",
            border: "1px solid gray",
            cursor: "grab",
            ...watermarkPosition,
          }}
          draggable
          onDragStart={handleDragStart}
        >
          <Text>{watermarkText}</Text>
        </div>
      )}
    </div>
  );
}
