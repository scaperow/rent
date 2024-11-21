
var path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') })

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let https = require("https");
let http = require('http')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resultRouter = require('./routes/result');
var migrator = require('migrate-mongo')
var parser = require('./parse-server')
var ParseServer = require('parse-server')
var notify = require('./routes/notify')


let fs = require('fs')


const passport = require('l-passport')
const {
  SSL_FORCE: sslForce,
  WECHAT_APPID: wechatAppId,
  WECHAT_APPSECRET: wechatAppSecret,
  APP_NAME,
  SERVER_PORT,
  COMPANY_NAME,
  COMPANY_SHORT_NAME,
  CLIENT_URL } = process.env

var app = express();

app.locals = {
  ...app.locals,
  appName: APP_NAME,
  companyName: COMPANY_NAME,
  companyShortName: COMPANY_SHORT_NAME,
  clientUrl: CLIENT_URL
};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/api', parser.server)
app.use('/manager', parser.manager)
app.use('/users', usersRouter);
app.use('/result', resultRouter)
app.use('/notify',notify)

app.get('/login', passport.authorization('wechat', { platform: 'web' }), async (ctx) => {
  ctx.body = ctx.state.passport;
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


if (wechatAppId && wechatAppSecret) {
  passport.initialize({
    redirect: `https://localhost:${SERVER_PORT}/login`,
    provider: 'wechat',
    clients: [
      { platform: 'web', appId: wechatAppId, appSecret: wechatAppSecret },
    ]
  }, app)
} else {
  ParseServer.logger.error('微信平台 key&secret 缺失，无法实现微信登录')
}

const start = function () {
  if (sslForce) {
    http.createServer((req, res) => {
      res.writeHead(301, { 'Location': 'https://' + req.headers.host + req.url });
      res.end()
    }).listen(SERVER_PORT)
  } else {
    http.createServer(app).listen(SERVER_PORT)
  }

  https.createServer({
    key: fs.readFileSync("ssl/server.key"),
    cert: fs.readFileSync("ssl/server.pem")
  }, app).listen(443)


}

var lockFileName = './migrate-lock'

if (fs.existsSync(lockFileName)) {
  start()
} else {
  fs.writeFileSync(lockFileName, '')

  migrator.database.connect()
    .then((result) => {
      migrator.up(result.db, result.client)
        .then((migrated) => {
          migrated.forEach(fileName => console.log('Migrated:', fileName))

          fs.unlinkSync(lockFileName)
          start()
        }, (error) => {
          fs.unlinkSync(lockFileName)
          throw error
        })
    }, (error) => {
      throw error
    })
}

module.exports = app;
