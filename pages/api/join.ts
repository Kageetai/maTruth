import type { NextApiRequest, NextApiResponse } from "next";
import { doc, DocumentData, getDoc } from "firebase/firestore/lite";
import { COLLECTION, store } from "../firebase";

type Data = {
  doc?: DocumentData;
  msg?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.query.id) {
    return res.status(400).json({ msg: "Missing id" });
  }

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  const docRef = doc(store, COLLECTION, id);
  const docSnap = await getDoc(docRef);

  return res.status(200).json({
    doc: docSnap.data(),
  });
}
