// ===================== DEVELOP REQUIRES =====================================
const notifier = require('node-notifier'),
      bodyParser = require('body-parser'),
      cors = require('cors')
// ----------------------------------------------------------------------------

// ===================== SELF FUNCTIONS REQUIRES ==============================
const getIpAddr = require('./app/modules/helpers/getIpAddr'),
      loadUser = require('./app/modules/loadUser')
// ----------------------------------------------------------------------------

// ===================== SELF EXPRESS APP REQURIES ============================
const userRoute = require('./app/routes/user/userRoute'),
      proffersRoute = require('./app/routes/proffers/proffersRoute'),
      campaignRoute = require('./app/routes/campaign/campaignRoute'),
      fetchpageRoute = require('./app/routes/fetchpage/fetchpageRoute'),
      postprofferRoute = require('./app/routes/postproffer/postprofferRoute')
// ----------------------------------------------------------------------------

// ==================== REQUIRE DB DEPENDS ====================================
const mongoose = require('mongoose'),
      session = require('express-session'),
      cookieParser = require('cookie-parser')
// ----------------------------------------------------------------------------

// ==================== INIT EXPRESS APPLICATION ==============================
//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true)

    next();
}
function enableCORSMiddleware (req,res,next) {
   // You could use * instead of the url below to allow any origin, 
   // but be careful, you're opening yourself up to all sorts of things!
   res.setHeader('Access-Control-Allow-Origin',  "http://192.168.16.106:8080");
   next()
}

const app = new (require('express'))()

// app.use(allowCrossDomain)
app.use(cookieParser())
app.use(session({
  secret : 's3Cur3',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    maxAge: null,
    secure: false,
    // httpOnly: true,
  },
}))
// app.use(cors({credentials: true}))
app.use(enableCORSMiddleware)
app.use(bodyParser())
// ----------------------------------------------------------------------------

// ==================== SET GLOBAL VARIABLES ==================================
app.set('port', process.env.PORT || 3000)
app.set('host', process.env.HOST || getIpAddr())
// ----------------------------------------------------------------------------

// ==================== CONNECT TO MONGODB ====================================
mongoose.connect('mongodb://localhost/bazar')
mongoose.connection.once('open', () => console.log('Подключено к mongodb'))
// ----------------------------------------------------------------------------

// ==================== INIT MIDDLEWARES ======================================
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
// ----------------------------------------------------------------------------

// ==================== INIT ROUTES ===========================================
app.use('/user', userRoute)
app.use('/campaign', campaignRoute)
app.use('/proffers', loadUser, proffersRoute)
app.use('/fetchpage', fetchpageRoute)
app.use('/postproffer', postprofferRoute)
app.get('/', (req,res) => {res.sendFile(`${__dirname}/public/index.html`)})
app.get('/public/bundle.js', (req,res) => {res.sendFile(`${__dirname}/dist/bundle.js`)})

app.get('/test', (req, res) => {
  console.log('Fetching page', req.session);
  console.log('Cookies: --->>>>', req.cookies);
  res.json(req.session)
})
// ----------------------------------------------------------------------------

// ==================== INIT SERVER ===========================================
app.listen(app.get('port'), app.get('host'), error => {
  let mess = (error) ? error : `Server: ${app.get('host')}:${app.get('port')}/`
  if (!error) notifier.notify(`${mess}`)
})
// ----------------------------------------------------------------------------
