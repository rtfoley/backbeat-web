import React from "react";
import { Button, ButtonToolbar, Card } from "react-bootstrap";
import { RetroItemCardProps } from "./types";

const RetroItemCard: React.FC<RetroItemCardProps> = ({ item, onPublish }) => {
  const handlePublish = (event: any) => {
    onPublish(item);
  };

  return (
    <Card className="mb-2 p-2">
      {item?.text}
      <br />
      {!item?.isPublished && onPublish ? (
        <ButtonToolbar>
          <Button variant="primary" onClick={handlePublish} className="mr-2">
            Publish
          </Button>
          <Button variant="danger" onClick={() => null}>
            Delete
          </Button>
        </ButtonToolbar>
      ) : (
        <em>{item?.authorName ?? ""}</em>
      )}
    </Card>
  );
};

export default RetroItemCard;
