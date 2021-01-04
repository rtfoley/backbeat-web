import { RetroItem } from "../../types";

export interface RetroItemGridProps {
  items: RetroItem[];
  showUnpublished: boolean;
  onPublish?: (item: RetroItem) => void;
}
