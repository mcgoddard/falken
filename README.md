# falken
Wargames scorekeeper app.

The idea with a tool like `falken` is to run an event with your devops teams to reveal weaknesses in your process when handling events or incidents. Typically this isn't too different from a CTF (Capture The Flag) event but with each team running (and trying to keep running) their own instance of the system under test. Here the teams are generally competing on score but their systems should be isolated and being tested independently, but using the same mechanisms.

## Dependencies
You'll need NPM & node installed.

## Build the app
From the `app` directory.
```sh
npm run build
```

## Deploy EVERYTHING!
From the falken-api directory.
```sh
serverless deploy
```

## Running WARGAMES
Falken includes a couple of ways to updates the scores for each team during the game, but I'd suggest building your own automated ways to stress your team and system.

### Modify a teams score using curl
```sh
curl -X PUT -H "Content-Type: application/json" -d '{ "team_name": "<team_name>", "modifier": <number> }' falken-api.mgoddard.net/scores
```
You could also use this HTTP endpoint from automated services.

### Traffic tester
There is a `traffic` lambda which will poll the provided endpoints on a (default 60 second) timer, 1000 times. It will post a positive score to the scoreboard if a team's endpoint responds and does so quickly (less than 1 second on average). You could reduce the number of calls to target endpoint to make it into a simple "online" check, or increase the number to turn it into more of a load test. You may have to adjust the score modification to based on the number of requests made.
