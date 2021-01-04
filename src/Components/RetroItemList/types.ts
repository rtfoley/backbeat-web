import { Columns, RetroItem } from "../../types";

export interface RetroItemListProps {
  items: RetroItem[];
  column: keyof typeof Columns;
  onPublish?: (item: RetroItem) => void;
}
