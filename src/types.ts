export enum Columns {
  LIKE = "LIKE",
  LEARNED = "LEARNED",
  LACKED = "LACKED",
  LONGED_FOR = "LONGED_FOR",
}

export interface RetroItem {
  text: string;
  column: Columns;
  author: string;
  isPublished: boolean;
  voters: string[];
}
