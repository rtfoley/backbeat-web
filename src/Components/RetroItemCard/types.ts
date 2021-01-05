import { RetroItem } from "../../types";

export interface RetroItemCardProps {
  item: RetroItem | any;
  onPublish?: (item: RetroItem) => void;
}
