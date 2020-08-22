import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});

  const snapshot = await admin.database().ref('ultimaExecucao').once('value');
  console.log(snapshot.val());

  response.send("Hello from Firebase!");
});
