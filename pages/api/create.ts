import type { NextApiRequest, NextApiResponse } from "next";
import {
  addDoc,
  getDocs,
  collection,
  DocumentData,
} from "firebase/firestore/lite";
import { COLLECTION, store } from "../firebase";

type Data = {
  docList?: DocumentData[];
  msg?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.query.name) {
    return res.status(400).json({ msg: "Missing name" });
  }

  const name = Array.isArray(req.query.name)
    ? req.query.name[0]
    : req.query.name;
  const sessionsCol = collection(store, COLLECTION);

  await addDoc(sessionsCol, { name });
  const snap = await getDocs(sessionsCol);
  const docList = snap.docs.map((doc) => doc.data());

  return res.status(200).json({
    docList,
  });
}
