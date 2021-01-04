import React from "react";
import { Col } from "react-bootstrap";
import { RetroItem } from "../../types";
import RetroItemCard from "../RetroItemCard";
import { RetroItemListProps } from "./types";

const RetroItemList: React.FC<RetroItemListProps> = ({ items, column }) => {
  return (
    <Col>
      {items
        .filter((item: RetroItem) => item.column === column)
        .map((item: RetroItem) => (
          <RetroItemCard key={item.id} item={item} />
        ))}
    </Col>
  );
};

export default RetroItemList;
