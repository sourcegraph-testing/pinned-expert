import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
const serviceAccount = JSON.parse(
  readFileSync(__dirname + '/serviceAccountKey.json', 'utf8')
);

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://expert.firebaseio.com',
});

const firestore = getFirestore(firebase);

export const db = {
  products: await firestore.collection('products'),
  users: await firestore.collection('users'),
  auth: admin.app().auth(),
};
