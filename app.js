/*******************************************************
 * big-todo
 * JSON objects implementation (server)
 * January 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Keith Jarrett Charlie Haden "Last Dance"
 *******************************************************/


// base modules
var http = require('http');
var querystring = require('querystring');

/// internal modules
var representation = require('./representation.js');

// connector modules
var home = require('./connectors/home.js');
var task = require('./connectors/task.js');
var user = require('./connectors/user.js');
var category = require('./connectors/category.js');
var utils = require('./connectors/utils.js');

// shared vars
var root = '';
var port = (process.env.PORT || 8282);
var prodType = 'application/json';
var testType = 'application/json';
var haljType = 'application/hal+json';
var htmlType = "text/html";
var csType = '';
var csAccept = '';

// routing rules
var reHome = new RegExp('^\/$','i');
var reCategory = new RegExp('^\/category\/.*','i');
var reFile = new RegExp('^\/files\/.*','i');
var reTask = new RegExp('^\/task\/.*','i');
var reUser = new RegExp('^\/user\/.*','i');

// request handler
function handler(req, res) {
  var segments, i, x, parts, rtn, flg, doc, url;

  // set local vars
  root = '//'+req.headers.host;
  csType = testType;
  flg = false;
  file = false;
  doc = null;

  // rudimentary accept-header handling
  csAccept = req.headers["accept"];
  if(!csAccept || csAccept.indexOf(htmlType)!==-1) {
    csType = htmlType;
  }
  else {
    csType = csAccept.split(',')[0];
  }
  // hack responses
  csType = haljType;
  
  // parse incoming request URL
  parts = [];
  segments = req.url.split('/');
  for(i=0, x=segments.length; i<x; i++) {
    if(segments[i]!=='') {
      parts.push(segments[i]);
    }
  }
  
  // handle options call
  if(req.method==="OPTIONS") {
    sendResponse(req, res, "", 200);
    return;
  }

  // home handler
  if(reHome.test(req.url)) {
    flg = true;
    doc = home(req, res, parts, handleResponse);
  }

  // category handler
  if(flg===false && reCategory.test(req.url)) {
    flg = true;
    category(req, res, parts, handleResponse);
  }

  // task handler
  if(flg===false && reTask.test(req.url)) {
    flg = true;
    task(req, res, parts, handleResponse);
  }

  // user handler
  if(flg===false && reUser.test(req.url)) {
    flg = true;
    user(req, res, parts, handleResponse);
  }

  // file handler
  try {
    if(flg===false && reFile.test(req.url)) {
      flg = true;
      utils.file(req, res, parts, handleResponse);
    }
  }
  catch(ex) {}
  
  // final error
  if(flg===false) {
    handleResponse(req, res, utils.errorResponse(req, res, 'Not Found', 404));
  }
}

// handle response work
function handleResponse(req, res, doc) {
  var rtn;
  
  if(doc!==null) {
    if(doc.file===true) {
      rtn = doc.doc;
    }
    else {
      rtn = representation(doc.doc, csType, root);
    }
    sendResponse(req, res, rtn, doc.code, doc.headers);
  }
  else {
    sendResponse(req, res, 'Server Response Error', 500);
  }
}
function sendResponse(req, res, body, code, headers) {
  var hdrs;
  
  if(headers && headers!==null) {
    hdrs = headers;
  }
  else {
    hdrs = {}
  }
  if(!hdrs['content-type']) {
    hdrs['content-type'] = csType;
  }

  // always add CORS headers to support external clients
  hdrs["Access-Control-Allow-Origin"] = "*";
  hdrs["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
  hdrs["Access-Control-Allow-Credentials"] = true;
  hdrs["Access-Control-Max-Age"] = '86400'; // 24 hours
  hdrs["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";

  res.writeHead(code, hdrs),
  res.end(body);
}

// wait for request
http.createServer(handler).listen(port);
console.log('listening on port '+port);

