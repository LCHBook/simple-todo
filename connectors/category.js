/*******************************************************
 * big-todo 
 * Category Connector
 * January 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Keith Jarrett Charlie Haden "Last Dance"
 *******************************************************/

var root = '';
var utils = require('./utils.js');
var components = require('./../components.js');
var transitions = require('./../transitions.js');
var qs = require('querystring');

module.exports = main;

function main(req, res, parts, respond) {
  var code, doc;

  switch(req.method) {
    case 'GET':
      if(parts[1] && parts[1].indexOf('?')===-1) {
        switch (parts[1]) {
          case "add":
            sendAddForm(req, res, respond);
            break;
          case "all":
          case "byname":
            sendList(req, res, respond, parts[1]);
            break;
          default:
            sendItem(req, res, parts[1], respond);
            break;
        }
      }
      else {
        sendList(req, res, respond);
      }
      break;
    case 'POST':
      if(parts[1]) {
        respond(req, res, utils.errorResponse(req, res, 'Method Not Allowed', 405));
      }
      else {
        addItem(req, res, respond);
      }
      break;
    default:
      respond(req, res, utils.errorResponse(req, res, 'Method Not Allowed', 405));
  }
}

function sendAddForm(req, res, respond) {
  var trans, rtn;
  
  trans = [];
  trans.push(transitions("homeLink"));
  trans.push(transitions("categoryCollectionLink"));
  trans.push(transitions("categoryAddForm"));
  
  doc = {code:200, doc:{actions:trans}};
  respond(req, res, doc);
}

function sendFilterByName(req, res, respond) {
  var trans, doc;
  
  trans = [];
  trans.push(transitions("homeLink"));
  trans.push(transitions("categoryCollectionLink"));
  trans.push(transitions("categoryFindByNameForm"));
  
  doc = {code:200, doc:{actions:trans}};
  respond(req, res, doc);
}

function sendList(req, res, respond, filter) {
  var list, doc, qlist, q, f, trans;

  q = req.url.split('?');
  if(q[1]!==undefined) {
    qlist = qs.parse(q[1]);
    switch (filter) {
      case "all":
        list = components.category('filter', qlist);
        break;
      case "byname":
        f = {"name":qlist["q"]};
        list = components.category('filter', f);
        break;
      default:
        respond(req, res, utils.errorResponse(req, res, 'File Not Found', 404, 'Invalid Search'));
        break;          
    }
  }
  else {
    if(!filter) {
      list = components.category('list');
    }
    else {
      switch(filter) {
        case "byname":
          sendFilterByName(req, res, respond);
          break;
        default:
          respond(req, res, utils.errorResponse(req, res, 'File Not Found', 404, 'Invalid Search'));
          break;
      }
    }
  }

  if(list!==undefined) {
    trans = [];
    trans.push(transitions('homeLink'));
    trans.push(transitions('categoryCollectionLink'));
    trans.push(transitions('categoryAddLink'));
    trans.push(transitions('categoryAddForm'));
    trans.push(transitions('categoryFindByNameLink'));
    trans.push(transitions('categoryFindByNameForm'));
    
    doc = {code:200, doc:{category:{actions:trans,data:list}}}
    respond(req, res, doc);
  }
}

function sendItem(req, res, id, respond) {
  var rtn, trans;

  rtn = components.category('read', id);
  if(Array.isArray(rtn) && rtn[0]===null) {
    doc = utils.errorResponse(req, res, 'File Not Found', 404);
  }
  else {
    trans = [];
    trans.push(transitions('homeLink'));
    trans.push(transitions('categoryCollectionLink'));
    trans.push(transitions('categoryAddLink'));
    trans.push(transitions('categoryAddForm'));
    trans.push(transitions('categoryFindByNameLink'));
    trans.push(transitions('categoryFindByNameForm'));
    doc = {code:200, doc:{category:{actions:trans,data:rtn}}};
  }
  respond(req, res, doc);
}

function addItem(req, res, respond) {
  var body, doc, msg, list, ctype;

  ctype='';
  body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    try {

      ctype = req.headers["content-type"];  
      switch(ctype) {
        case "application/x-www-form-urlencoded":
          msg = qs.parse(body);
          break;
        default:  
          msg = JSON.parse(body);
          break;
      }
      
      msg = validate(msg);
      if(msg.type==='error') {
        doc = utils.errorResponse(req, res, msg.message, msg.code);
      }
      else {
        list = components.category('add', msg);
      }
    }
    catch(ex) {
      doc = utils.errorResponse(req, res, 'Server Error', 500);
    }
    
    if(!doc) {
      sendList(req, res, respond);
    }
    else {
      respond(req, res, doc);
    }
  });

  return doc;
}

function validate(msg) {
  var doc;

  // required properties
  if(!msg.name) {
    doc = utils.exception("Category", "Missing [name] property", 400);
    return doc;
  }

  return msg;
}

// EOF

