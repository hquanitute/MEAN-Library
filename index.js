const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
// const database = require('./config/database');
// const UsersRoute = require('./app/routes/usersRoute');
const mainRouter = require('./app/routers/mainRouter');
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

// Connect to database
let count = 0;
mongoose.Promise = global.Promise;

function connectDatabase() {
  let mongoString ="mongodb+srv://supershay:quan123456@cluster0-6y3y0.mongodb.net/library?replicaSet=Cluster0-shard-0&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1&3t.uriVersion=3&3t.connection.name=Cluster0-shard-0&3t.databases=admin,test";
  // let mongoString ="mongodb://localhost:27017/library";

  mongoose.connect(mongoString
, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
      console.log('Connect to database successfully');
    })
    .catch((err) => {
      console.log(`Cannot connect to database. Try connecting after 5 seconds (${++count})`);
      setTimeout(connectDatabase, 5000);
    });
}

connectDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Route api

let apiRouter = express.Router(); 
apiRouter.use('/api',mainRouter);
// require('./app/middlewares/setHeaders')(app);
// require('./app/routes/loginRoute')(apiRouter);
// UsersRoute.createUserRoute(apiRouter);

// require('./app/middlewares/authenticate')(apiRouter);

// UsersRoute.manipulateUserRoute(apiRouter);
// require('./app/routes/decksRoute')(apiRouter);
// require('./app/routes/cardsRoute')(apiRouter);

app.use('/', apiRouter);

app.listen(port);
console.log('App listening on port ' + port);