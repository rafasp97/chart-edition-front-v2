// src/services/FirestoreService.ts
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { db } from "../database/firebase";
import type { Artist } from "../interfaces/Artist";
import type { FireBaseData } from "../interfaces/FireBaseData";

class FirestoreService {
  async getLastRankByGroup(groupName: string): Promise<Artist[]> {
    try {
      const groupId = await this.getGroupId(groupName);
      const colRef = collection(db, "ranks");

      const q = query(
        colRef,
        where("groupId", "==", groupId),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const snapshot = await getDocs(q);
      
      const lastData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<FireBaseData, "id">)
      }));

      const rankData = lastData[0]?.rank;

      if (typeof rankData === "string") {
        return JSON.parse(rankData) as Artist[];
      }
      return [];

    } catch (error) {
      console.error("Erro ao buscar último rank:", error);
      return [];
    }
  }

  async getGroupId(groupName: string): Promise<string | null> {
    try {
      const colRef = collection(db, "groups");
      const q = query(
        colRef,
        where("name", "==", groupName)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty || !snapshot.docs[0]) {
        console.warn("Nenhum grupo encontrado");
        return null;
      }
      return snapshot.docs[0].id;
    } catch (error) {
      console.error("Erro ao buscar IDs de grupos:", error);
      return null;
    }
  }

}

export default new FirestoreService();
