import React from "react";
import { Row } from "react-bootstrap";
import { Columns, RetroItem } from "../../types";
import RetroItemList from "../RetroItemList";
import { RetroItemGridProps } from "./types";

const RetroItemGrid: React.FC<RetroItemGridProps> = ({items, showUnpublished}) => {
  const filteredItems: RetroItem[] = items.filter((item: RetroItem) => item.isPublished !== showUnpublished);

  return (
    <Row>
      <RetroItemList items={filteredItems} column={Columns.LIKE}/>
      <RetroItemList items={filteredItems} column={Columns.LEARNED}/>
      <RetroItemList items={filteredItems} column={Columns.LACKED}/>
      <RetroItemList items={filteredItems} column={Columns.LONGED_FOR}/>
    </Row>
  )
}

export default RetroItemGrid;
