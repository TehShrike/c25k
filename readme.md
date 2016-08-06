Functional couch-to-5k direction-giving app.

Pick the current day in the schedule, then follow the on-screen directions.

When you finish a jog, or hit the "done" button, it will remember that in localstorage.

# To use the current version

Go to https://tehshrike.github.io/c25k/

# To develop locally

```
git clone https://github.com/TehShrike/c25k.git
cd c25k
npm install
npm run build
```

# Features that aren't implemented but you can open pull requests that I will merge

I set my phone on the treadmill in front of me, so I operate entirely off of visual cues.  To go running outside, you'll probably want:

- audio cues when steps change
- an option to disable the "keep the screen alive" functionality

Other things that could be necessary eventually:

- better feedback as to how many days ago you completed the last run
- maybe some kind of calendar to show your progress over time and whether or not you're getting the week's worth of runs done in a week
- some kind of modification of history - maybe if you go back to an earlier date, the days after that one are colored differently (even though you've technically completed them before) so that you can still tell visually which day would be next after your most recent jog

Nice-to-haves:

- fancier congratulation screen (fireworks?)
- colors picked by someone with a better feel for these kinds of things

# Eventually

If I ever make it to 5K (or someone else beats me to it), there will be a 5K-to-10K version!

# License

[WTFPL](http://wtfpl2.com/)
