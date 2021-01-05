import React from "react";
import { Row } from "react-bootstrap";
import { Columns, RetroItem } from "../../types";
import RetroItemList from "../RetroItemList";
import { RetroItemGridProps } from "./types";

const RetroItemGrid: React.FC<RetroItemGridProps> = ({
  items,
  showUnpublished,
  onPublish,
}) => {
  const filteredItems: RetroItem[] | any[] = items?.filter(
    (item: RetroItem) => item.isPublished !== showUnpublished
  );

  return (
    <Row>
      <RetroItemList
        items={filteredItems}
        column={Columns.LIKED}
        onPublish={onPublish}
      />
      <RetroItemList
        items={filteredItems}
        column={Columns.LEARNED}
        onPublish={onPublish}
      />
      <RetroItemList
        items={filteredItems}
        column={Columns.LACKED}
        onPublish={onPublish}
      />
      <RetroItemList
        items={filteredItems}
        column={Columns.LONGED_FOR}
        onPublish={onPublish}
      />
    </Row>
  );
};

export default RetroItemGrid;
