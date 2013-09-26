
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongojs = require('mongojs')
  , MongoStore = require('connect-mongo')(express);

var ObjectId = mongojs.ObjectId;

var app = express(), db;

app.configure(function () {
  db = mongojs(process.env.MONGOLAB_URI || 'twitterproto', ['tweets', 'following']);
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('secret', process.env.SESSION_SECRET || 'terrible, terrible secret')
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(app.get('secret')));
  app.use(express.session({
    secret: app.get('secret'),
    store: new MongoStore({
      url: process.env.MONGOLAB_URI || 'mongodb://localhost/twitterproto'
    })
  }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.set('host', 'localhost:3000');
  app.use(express.errorHandler());
});

app.configure('production', function () {
  app.set('host', 'twitterproto.herokuapp.com');
});

/**
 * Routes
 */

app.get('/', function (req, res) {
  res.redirect('https://github.com/mobileproto/twitterproto');
})

app.get('/secret', function (req, res) {
  db.tweets.find({
    // published: true
  }).sort({date: -1}, function (err, docs) {
    console.log(docs);
    res.render('index', {
      title: 'TweetProto',
      quotes: docs,
      user: {}
    });
  })
});

app.get('/tweets', function (req, res) {
  var query = { };
  if ('q' in req.query) {
    query.tweet = {$regex: ".*" + req.query.q + ".*"};
  }
  db.tweets.find(query).sort({date: -1}, function (err, docs) {
    res.json({"tweets": docs});
  })
});

app.get('/tweets/:id', function (req, res) {
  db.tweets.findOne({
    _id: db.ObjectId(req.params.id)
  }, function (err, doc) {
    res.json(doc);
  })
});

app.del('/tweets/:id', function (req, res) {
  db.tweets.remove({
    _id: ObjectId(req.body.id)
  }, function (err) {
    res.json({"error": err})
  })
});

app.get('/:username/tweets', function (req, res) {
  var query = {
    username: req.params.username 
  };
  if ('q' in req.query) {
    query.tweet = {$regex: ".*" + req.query.q + ".*"};
  }
  db.tweets.find(query).sort({date: -1}, function (err, docs) {
    res.json({"tweets": docs});
  })
});

app.get('/:username/following', function (req, res) {
  db.following.find({
    username: req.params.username
  }, function (err, docs) {
    res.json({"following": docs.map(function (entry) {
      return entry.following;
    })});
  })
});

app.get('/:username/followers', function (req, res) {
  db.following.find({
    following: req.params.username
  }, function (err, docs) {
    res.json({"followers": docs.map(function (entry) {
      return entry.username;
    })});
  })
});

app.post('/:username/follow', function (req, res) {
  if (req.body.username) {
    db.following.findOne({
      username: req.params.username,
      following: req.body.username,
    }, function (err, found) {
      if (!found) {
        db.following.save({
          username: req.params.username,
          following: req.body.username,
          date: Date.now()
        }, res.json.bind(res, {"error": false}));
      } else {
        res.json({"error": false})
      }
    });
  } else {
    res.json({error: true, message: 'Invalid following request'}, 500);
  }
})

app.del('/:username/following/:following', function (req, res) {
  db.following.remove({
    username: req.params.username,
    following: req.params.following
  }, function (err) {
    res.json({"error": err})
  })
});

app.get('/users', function (req, res) {
  db.tweets.distinct('username', function (err, names) {
    res.json({"usernames": names});
  });
})

app.post('/:username/tweets', function (req, res) {
  if (req.body.tweet) {
    db.tweets.save({
      tweet: req.body.tweet,
      username: req.params.username,
      date: Date.now()
    }, res.json.bind(res, {"error": false}));
  } else {
    res.json({error: true, message: 'Invalid quote'}, 500);
  }
})

/**
 * Launch
 */

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on http://" + app.get('host'));
});
