import React, { useRef } from "react";
import styles from "./drag-and-drop-container.module.css";

type Props = {
  children: React.ReactNode;
  dragElement: React.ReactElement;
  dragElementPosition?: { top: number; left: number };
  onChange: (position: { top: number; left: number }) => void;
};

export default function DragAndDropContainer(props: Props) {
  const { children, dragElementPosition, dragElement, onChange } = props;

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

    onChange(newPosition);
  };

  return (
    <div
      ref={containerRef}
      className={styles["drag-and-drop-container__container"]}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}

      <div
        ref={elementRef}
        style={{
          top: dragElementPosition?.top,
          left: dragElementPosition?.left,
        }}
        className={styles["drag-and-drop-container__drag-element"]}
        draggable
        onDragStart={handleDragStart}
      >
        {dragElement}
      </div>
    </div>
  );
}
