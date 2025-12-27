import type { Artist } from "./Artist";

export interface FireBaseData {
  id: string;
  groupId: string;
  createdAt: string;
  rank: Artist[];
}
