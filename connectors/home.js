/*************************************************
 * big-todo
 * Home Connector
 * January 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Max Roach : Percusson Bitter Sweet
 *************************************************/

var root = '';
var utils = require('./utils.js');
var transitions = require('./../transitions.js');

module.exports = main;

function main(req, res, parts, respond) {
    
  if(req.method==='GET') {
      sendHome(req, res, respond);
  }
  else {
      respond(req, res, utils.errorResponse(req, res, 'Method Not Allowed'));
  }
 }

function sendHome(req, res, respond) {
  var doc, coll;

  coll = [];
  coll.splice(coll.length, 0, transitions("taskCollectionLink"));
  coll.splice(coll.length, 0, transitions("categoryCollectionLink"));
  coll.splice(coll.length, 0, transitions("userCollectionLink"));

  doc = {};
  doc.actions = coll;
  
  respond(req, res, {code:200, doc:{home:doc}});
}

// EOF

