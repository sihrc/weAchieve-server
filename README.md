# twitterproto

## API

### Tweeting
You cool

&#x20;<a href="#api-GET-tweets" name="api-GET-tweets">#</a> GET /tweets  
Get all user tweets.

&#x20;<a href="#api-POST-username-tweets" name="api-POST-username-tweets">#</a> POST /:username/tweets  
Post a new tweet. Body is `{"status": "...text..."}`

&#x20;<a href="#api-GET-username-tweets" name="api-GET-username-tweets">#</a> GET /:username/tweets  
Get all the tweets for a user.

### Searching
More more

&#x20;<a href="#api-GET-tweets-q-pattern-" name="api-GET-tweets-q-pattern-">#</a> GET /tweets?q=<pattern>  
Search for all tweets that match a particular pattern.

&#x20;<a href="#api-GET-username-tweets-q-pattern-" name="api-GET-username-tweets-q-pattern-">#</a> GET /:username/tweets?q=<pattern>  
Search for all tweets from a user that match a particular pattern.


## License

MIT