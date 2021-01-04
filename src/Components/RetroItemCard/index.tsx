import React from "react"
import { Card } from "react-bootstrap"
import { RetroItemCardProps } from "./types";

const RetroItemCard: React.FC<RetroItemCardProps> = ({item}) => {
  return (
    <Card>
      <Card.Body>{item.text}</Card.Body>
    </Card>
  )
}

export default RetroItemCard;
