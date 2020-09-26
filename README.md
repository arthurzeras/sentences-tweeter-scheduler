# Sentences Tweeter Scheduler

This project it was designed to tweet entire movie Shrek script (in brazilian portuguese version) sentence by sentence hourly. But, works with any text file (for now, only hosted in a gist).

You can see the final result here: [@ShrekScriptPtBr](https://twitter.com/ShrekScriptPtBr/)

## Motivation

Inspired by [@ShrekScriptLol](https://twitter.com/ShrekScriptLol/) my goal with this was do the same thing, but tweeting movie script in Brazilian Portuguese version. Besides being a chance to learn something new.

## How it works

Mainly uses resources of the [Firebase](https://firebase.google.com/).

I have on my gist, a private `.txt` file, containing the entire script of the movie, each sentence separated by a line break.

So I took a project that I had in my firebase account and did the following:

- Created a database in the [Realtime Database](https://firebase.google.com/docs/database) just to store what is the next sentence index to be tweeted. (Starts at 0)
- Implemented a [Cloud Function](https://firebase.google.com/docs/functions), using the [Scheduler](https://firebase.google.com/docs/functions/schedule-functions), running hourly. This function fetches the `.txt` file in my gist, split the text, separating it by line and storing it in an `array`, takes the sentence based on what is in the Realtime Database, posts the Tweet (using [twitter-lite library](https://github.com/draftbit/twitter-lite)), and increments the index in database for the next execution.

## Deployment

> Recommend use Node.js version 12+

### Firebase
- First, you need a project on [Firebase](https://firebase.google.com/);
- Go to **Realtime Database** on side menu, (you can create database on blocked mode) and create a entry like this:

```json
  {
    lastExec: 0
  }
```

[More info](https://firebase.google.com/docs)

### Twitter

You need a verified account on Twitter

- Go to [developer dashboard](https://developer.twitter.com/en/dashboard);
- On top menu, go to your username and click on **Apps** menu;
- Click on **Create an app** button;
- Fill informations and submit;
- On app management, go to **Keys and Tokens** menu;

On **Consumer API keys** section is your app credentials.
On **Access token & access token secret** section is your account credentials, you need to download **Access Token** and **Access Token Secret** values and save on secure place;

### Gist

Create a secret Gist. Here you need to remember two important things:

- Every sentence must be separated by a line break;
- Max characters for every sentence is 280 because tweet limitation.

### Project configuration

- Install `firebase-tools` globally on your machine: `npm i -g firebase-tools`;
- Login on your Firebase account: `firebase login`;
- Duplicate `.firebaserc.example` file, rename to `.firebaserc` and change contents to:

```
{
  "projects": {
    "default": "<your-firebase-project-id>"
  }
}
```

- Install functions dependencies: `cd funcions && npm install`;

### Environment Variables

Now you need to configure credentials and gist file informations on environment variables:

- Go to functions directory and run following commands on terminal:

```bash
$ firebase functions:config:set gist.id="<your_gist_file_id>"
$ firebase functions:config:set gist.filename="<your_gist_file_name>.txt"
$ firebase functions:config:set twitter.user.accesstoken="<twitter_access_token_of_account_target>"
$ firebase functions:config:set twitter.user.secret="<twitter_access_token_secret_of_account_target>"
$ firebase functions:config:set twitter.consumer.key="<twitter_consumer_api_key_of_your_app>"
$ firebase functions:config:set twitter.consumer.secret="<twitter_consumer_api_secret_key_of_your_app>"
```

> **Gist ID** is on access URL of the Gist, example: `https://gist.github.com/<your_github_username>/<gist_id_here>`;
> `twitter.user.*` values are the credentials of the account where the tweets will be posted.

- Finally, run deploy command: `firebase deploy --only functions`;

After that you can follow the scheduler logs on Firebase Console through menu **Functions** and **Logs**.