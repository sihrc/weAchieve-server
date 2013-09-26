
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongojs = require('mongojs')
  , MongoStore = require('connect-mongo')(express);

var app = express(), db;

app.configure(function () {
  db = mongojs(process.env.MONGOLAB_URI || 'twitterproto', ['tweets']);
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
  db.tweets.find({
    // published: true
  }).sort({date: -1}, function (err, docs) {
    res.json({"tweets": docs});
  })
});

app.get('/:username/tweets', function (req, res) {
  db.tweets.find({
    username: req.params.username
  }).sort({date: -1}, function (err, docs) {
    res.json({"tweets": docs});
  })
});

app.post('/delete', function (req, res) {
  db.tweets.update({
    _id: db.ObjectId(req.body.id)
  }, {
    $set: {
      published: false
    }
  }, function () {
    res.redirect('/');
  })
})

app.get('/users', function (req, res) {
  db.tweets.distinct('username', function (err, names) {
    res.json(names);
  });
})

app.post('/:username/quotes', function (req, res) {
  if (req.body.quote) {
    db.tweets.save({
      tweet: req.body.quote,
      username: req.params.username,
      date: Date.now()
    }, res.redirect.bind(res, '/'));
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
