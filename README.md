# twitterproto

## API

### Tweeting
Retrieve, post, and search tweets.

&#x20;<a href="#api-GET-tweets" name="api-GET-tweets">#</a> <b>GET</b> /tweets  
Get all tweets, ever! Returns: 

```js
{
  "tweets": [
    {
      "status": "Everything happens so much",
      "datetime": "2013-09-03T00:00:00",
      "username": "horse_ebooks" 
    }
    ...
  ]
}
```

&#x20;<a href="#api-POST-username-tweets" name="api-POST-username-tweets">#</a> <b>POST</b> /`:username`/tweets  
Post a new tweet as a user. Your status should be <= 140 characters! Submit a payload:

```
{
  "status": "...text..."
}
```

&#x20;<a href="#api-GET-username-tweets" name="api-GET-username-tweets">#</a> <b>GET</b> /`:username`/tweets  
Get all the tweets for a user. Returns:

```js
{
  "tweets": [
    {
      "status": "Everything happens so much",
      "datetime": "2013-09-03T00:00:00",
      "username": "horse_ebooks" 
    }
    ...
  ]
}
```

&#x20;<a href="#api-GET-tweets-q-pattern" name="api-GET-tweets-q-pattern">#</a> <b>GET</b> /tweets?q=`:pattern`  
Search for all tweets that include `:pattern`. See /tweets.

&#x20;<a href="#api-GET-username-tweets-q-pattern" name="api-GET-username-tweets-q-pattern">#</a> <b>GET</b> /`:username`/tweets?q=:pattern  
Search for all tweets from a user that include `:pattern`. See /`:username`/tweets.

### Follows
Connect people, see who follows whom, etc.

&#x20;<a href="#api-GET-username-followers" name="api-GET-username-followers">#</a> <b>GET</b> /`:username`/followers  
See who follows this user. Returns:

```js
{
  "followers": [
    "horse_ebooks",
    "reyner",
    "renyer"
  ]
}
```

&#x20;<a href="#api-GET-username-following" name="api-GET-username-following">#</a> <b>GET</b> /`:username`/following  
See who this user is following. Returns:

```js
{
  "following": [
    "horse_ebooks",
    "reyner",
    "renyer"
  ]
}
```

&#x20;<a href="#api-POST-username-follow" name="api-POST-username-follow">#</a> <b>POST</b> /`:username`/follow  
Make someone follow another person. Submit a payload:

```js
{
  "username": "horse_ebooks"
}
```


## License

MIT