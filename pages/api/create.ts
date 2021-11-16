import type {NextApiRequest, NextApiResponse} from 'next'
import {FirebaseOptions, initializeApp} from 'firebase/app';
import {addDoc, getFirestore, getDocs, collection, DocumentData} from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

type Data = {
    name: string,
    docList: DocumentData[],
}

const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const name = Array.isArray(req.query.name) ? req.query.name[0] : req.query.name;
    const sessionsCol = collection(db, 'sessions');

    await addDoc(sessionsCol, {name});
    const snap = await getDocs(sessionsCol);
    const docList = snap.docs.map(doc => doc.data());

    res.status(200).json({
        name,
        docList,
    })
}
