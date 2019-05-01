var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var assert = require('assert');
var cors = require('cors');
var fabricUtils = require('fabric-utils');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var driver = require('./routes/driver');
var drivers = require('./routes/drivers');
var customer = require('./routes/customer');
var customers = require('./routes/customers');
var shipments = require('./routes/shipments');
var pickup = require('./routes/pickup');
var pickups = require('./routes/pickups');
var shipment = require('./routes/shipment');
var delivery = require('./routes/delivery');
var bol = require('./routes/billoflading');
var bolList = require('./routes/bol-list');
var history = require('./routes/history');
var admin = require('./routes/admin');
var servicecenter = require('./routes/servicecenter');
var transaction = require('./routes/transaction');
var block = require('./routes/block');
var config = require('./config.json');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors('*'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/driver', driver);
app.use('/drivers', drivers);
app.use('/customer', customer);
app.use('/customers', customers);
app.use('/shipments', shipments);
app.use('/pickup', pickup);
app.use('/pickups', pickups);
app.use('/shipment', shipment);
app.use('/delivery', delivery);
app.use('/billoflading/', bol);
app.use('/bollist', bolList);
app.use('/history', history);
app.use('/admin', admin);
app.use('/servicecenter', servicecenter);
app.use('/transaction', transaction);
app.use('/block', block);

// set application configuration
fabricUtils.fabricHelper.setHFCConfigSettings('network-connection-profile-path', __dirname, 'network-config.yaml');
fabricUtils.fabricHelper.setHFCConfigSettings('fedex-connection-profile-path', __dirname, 'fedexConfig.yaml');

fabricUtils.fabricHelper.setApplicationSettings(__dirname, 'adminConfig.json');

//get admin
fabricUtils.fabricHelper.getClientForOrg(config.orgName,'', config.networkConnectionProfile, config.orgConnectionProfile)
  .then((client) => {
  assert.notStrictEqual(client, "undefined");

    return fabricUtils.fabricHelper.getAdminUser(client);
  }).then((adminUser) => {

    assert.notStrictEqual(adminUser, "undefined");
    console.log("Admin user loaded successfully");
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
