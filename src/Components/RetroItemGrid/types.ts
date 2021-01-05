import { RetroItem } from "../../types";

export interface RetroItemGridProps {
  items: RetroItem[] | any[];
  showUnpublished: boolean;
  onPublish?: (item: RetroItem) => void;
}
