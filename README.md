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