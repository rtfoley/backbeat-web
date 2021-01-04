export enum Columns {
  LIKED = "LIKED",
  LEARNED = "LEARNED",
  LACKED = "LACKED",
  LONGED_FOR = "LONGED_FOR",
}

export interface RetroItem {
  id: number;
  text: string;
  column: Columns;
  isPublished: boolean;
  voters: string[];
  created: number;
  createdBy: string;
  authorName: string;
}
