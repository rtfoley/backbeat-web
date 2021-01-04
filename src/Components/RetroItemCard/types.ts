import { RetroItem } from "../../types";

export interface RetroItemCardProps {
  item: RetroItem;
  onPublish?: (item: RetroItem) => void;
}
