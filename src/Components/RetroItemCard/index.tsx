import React from "react";
import { Button, Card } from "react-bootstrap";
import { RetroItemCardProps } from "./types";

const RetroItemCard: React.FC<RetroItemCardProps> = ({ item }) => {
  return (
    <Card className="mb-2 p-1">
      <Card.Title>{item.text}</Card.Title>
      <Card.Subtitle>{item.authorName ?? ""}</Card.Subtitle>
      {item.isPublished ? null : <Button variant="primary">Publish</Button>}
    </Card>
  );
};

export default RetroItemCard;
