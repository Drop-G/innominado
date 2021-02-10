const express = require ('express');
const mongoose = require ('mongoose');
const app = express()
require('dotenv').config();
const config = require('../config.json');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('../_middleware/error-handler');

const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.connection.on('connected', function(){console.log('Connected to MongoDB Admin')})
mongoose.connection.on('error', function (err) { console.log(err) });
mongoose.connection.on('disconnected', function(){console.log("Disconnected from MongoDB")})

mongoose.Promise = global.Promise;

module.exports = {
    Account: require('../accounts/account.model'),
    RefreshToken: require('../accounts/refresh-token.model'),
    isValidId
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/accounts', require('../accounts/accounts.controller'));

// swagger docs route
app.use('/api-docs', require('../_helpers/swagger'));

// global error handler
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3001;
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
