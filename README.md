# weachieve

## API

### Courses
Get, join, delete courses.

&#x20;<a href="#api-POST-username-course" name="api-POST-username-course">#</a> <b>POST</b> /`:username`/coure  
Enroll a user in a class. Submit a payload:

```
{
  "course": "...course name..."
}
```

&#x20;<a href="#api-GET-username-courses" name="api-GET-username-courses">#</a> <b>GET</b> /`:username`/courses  
Get all classes user is enrolled in. Returns:

```js
{
  "courses": [
    "MobileProto",
    "Linearity 2"
  ]
}
```

&#x20;<a href="#api-GET-courses" name="api-GET-courses">#</a> <b>GET</b> /courses  
Get all courses. Returns:

```js
{
  "courses": [
    "MobileProto",
    "Linearity 2"
  ]
}
```

### Sessions
Create, join, delete sessions.

&#x20;<a href="#api-GET-tweets" name="api-GET-tweets">#</a> <b>GET</b> /tweets  
Get all sessionss, ever! Returns: 

```js
{
  "sessions": [
    {
      "course": "mob",
      "task": "database11",
      "when": "23156545245",
      "place": "wh2al",
      "usersAttending": [
        "maci"
      ],
      "_id": "525c938584a1000200000001"
    }
  ]
}
```

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
