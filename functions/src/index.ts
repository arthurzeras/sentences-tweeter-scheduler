import Twitter from 'twitter-lite';
import * as admin from 'firebase-admin';
import fetch, { Headers } from 'node-fetch';
import * as functions from 'firebase-functions';

admin.initializeApp();

export const TweetScriptSentenceScheduler = functions
  .pubsub.schedule('00 * * * *')
  .onRun(async () => {
    try {
      const headers = new Headers();
      headers.append('Accept', 'application/vnd.github.v3+json');

      const snapshot = await admin.database().ref('lastExec').once('value');
      
      const lastExecutionIndex = snapshot.val();

      const { gist, twitter } = functions.config();

      const gistResponse = await fetch(
        `https://api.github.com/gists/${gist.id}`, {
          headers
        }
      );

      const gistData = await gistResponse.json();

      const sentence = gistData.files[gist.filename].content.split('\n')[lastExecutionIndex];

      const client = new Twitter({
        access_token_secret: twitter.user.secret,
        access_token_key: twitter.user.accesstoken,
        consumer_key: twitter.consumer.key,
        consumer_secret: twitter.consumer.secret,
      });

      await client.post('statuses/update', {
        status: sentence
      });

      functions.logger.info(`😎 Sentence tweeted: ${sentence}`, { structuredData: true });

      await admin.database().ref('lastExec').set(lastExecutionIndex + 1);
    } catch (error) {
      functions.logger.error('🙁 Error: ', error.message, error);
    }
  });
