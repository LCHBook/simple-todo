/*******************************************************
 * big-todo 
 * User Connector
 * January 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Keith Jarrett Charlie Haden "Last Dance"
 *******************************************************/

var root = '';
var qs = require('querystring');
var utils = require('./utils.js');
var components = require('./../components.js');
var transitions = require('./../transitions.js');

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
          case "changepw":
            sendChangePWForm(req, res, parts[2], respond);
            break;  
          case "update":
            sendUpdateForm(req, res, parts[2], respond);
            break;
          case "all":
          case "byname":
          case "byuser":
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
        switch (parts[1]) {
          case "changepw":
            changePW(req, res, respond);
            break;
          case "update":
            updateItem(req, res, null, respond);
            break;
          default:
            respond(req, res, utils.errorResponse(req, res, 'Method Not Allowed', 405));
            break;
        }
      }
      else {
        addItem(req, res, respond);
      }
      break;
      case 'PUT':
        if(parts[1]) {
            updateItem(req, res, parts[1], respond);
        }
        else {
            doc = utils.errorResponse(req, res, 'Method Not Allowed',405);
        }
        break;
    default:
      respond(req, res, utils.errorResponse(req, res, 'Method Not Allowed', 405));
  }
}

function sendList(req, res, respond, filter) {
  var list, doc, qlist, q, f, trans;

  q = req.url.split('?');
  
  // if we have args...
  if(q[1]!==undefined) {
    qlist = qs.parse(q[1]);
    switch(filter) {
      case "all":
        list = components.user('filter', qlist);
        break;
      case "byname":
        f = {"familyName":(qlist["fn"]?qlist["fn"]:''), "givenName":(qlist["gn"]?qlist["gn"]:'')};
        list = components.user('filter', f);
        break;
      case "byuser":
        f = {"userName":qlist["q"]};
        list = components.user('filter', f);
        break;
      default:
        respond(req, res, utils.errorResponse(req, res, 'File Not Found', 404, 'Invalid Search'));
        break;
    }
  }
  else {
    // no filter, send regular list
    if(!filter) {
      list = components.user('list');
    }
    else {
      // filter, but no args...
      switch(filter) {
        case "byname":
          sendFilterByName(req, res, respond);
          break;
        case "byuser":
          sendFilterByUser(req, res, respond);
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
    trans.push(transitions('userCollectionLink'));
    trans.push(transitions('userItemLink'));
    trans.push(transitions('userAddLink'));
    trans.push(transitions('userAddForm'));
    trans.push(transitions('userFindByNameLink'));
    trans.push(transitions('userFindByNameForm'));
    trans.push(transitions('userFindByUserLink'));
    trans.push(transitions('userFindByUserForm'));
    trans.push(transitions('userChangePWLink'));
    trans.push(transitions('userChangePWForm'));
    trans.push(transitions('userUpdateLink'));
    trans.push(transitions('userUpdateForm'));
    
    doc = {code:200, doc:{user:{actions:trans,data:list}}}
    respond(req, res, doc);
  }  
}

function sendItem(req, res, id, respond) {
  var trans, doc, rtn;

  rtn = components.user('read', id);
  if(Array.isArray(rtn) && rtn[0]===null) {
    doc = utils.errorResponse(req, res, 'File Not Found', 404);
  }
  else {
    trans = [];
    trans.push(transitions('homeLink'));
    trans.push(transitions('userCollectionLink'));
    trans.push(transitions('userItemLink'));
    trans.push(transitions('userAddLink'));
    trans.push(transitions('userAddForm'));
    trans.push(transitions('userFindByNameLink'));
    trans.push(transitions('userFindByNameForm'));
    trans.push(transitions('userFindByUserLink'));
    trans.push(transitions('userFindByUserForm'));
    trans.push(transitions('userChangePWLink'));
    trans.push(transitions('userChangePWForm'));
    trans.push(transitions('userUpdateLink'));
    trans.push(transitions('userUpdateForm'));
  
    doc = {code:200, doc:{user:{actions:trans, data:rtn}}};
  }
  respond(req, res, doc);
}

// input models
function sendAddForm(req, res, respond) {
  var trans, doc;
  
  trans = [];
  trans.push(transitions("homeLink"));
  trans.push(transitions("userCollectionLink"));
  trans.push(transitions("userAddForm"));
  
  doc = {code:200, doc:{actions:trans}};
  respond(req, res, doc);
}

function sendChangePWForm(req, res, id, respond) {
  var item, trans, doc, i, x, rtn;

  item = components.user('read', id)[0];

  trans = [];
  trans.push(transitions("homeLink"));
  trans.push(transitions("userCollectionLink"));

  // pull & populate target form
  rtn = transitions("userChangePWForm");
  for(i=0, x=rtn.inputs.length; i<x; i++) {
    switch(rtn.inputs[i].name) {
      case "id":
        rtn.inputs[i].value = item.id;
        break;
    }
  }
  trans.push(rtn);

  doc = {code:200, doc:{actions:trans}};
  respond(req, res, doc);
}

function sendUpdateForm(req, res, id, respond) {
  var item, rtn, doc, trans, i, x;

  item = components.user('read', id)[0];

  trans = [];
  trans.push(transitions("homeLink"));
  trans.push(transitions("userCollectionLink"));
  
  // pull & populate target form
  rtn = transitions("userUpdateForm");
  for(i=0, x=rtn.inputs.length; i<x; i++) {
    switch(rtn.inputs[i].name) {
      case "id":
        rtn.inputs[i].value = item.id;
        break;      
      case "familyName":
        rtn.inputs[i].value = item.familyName;
        break;      
      case "givenName":
        rtn.inputs[i].value = item.givenName;
        break;      
      case "webUrl":
        rtn.inputs[i].value = item.webUrl;
        break;      
      case "avatarUrl":
        rtn.inputs[i].value = item.avatarUrl;
        break;      
    }
  }
  trans.push(rtn);
  
  doc = {code:200, doc:{actions:trans}};
  respond(req, res, doc);
}

function sendFilterByName(req, res, respond) {
  var trans, doc;
  
  trans = [];
  trans.push(transitions("homeLink"));
  trans.push(transitions("userCollectionLink"));
  trans.push(transitions("userFindByNameForm"));
  
  doc = {code:200, doc:{actions:trans}};  
  respond(req, res, doc);
}

function sendFilterByUser(req, res, respond) {
  var trans, doc;

  trans = [];
  trans.push(transitions("homeLink"));
  trans.push(transitions("userCollectionLink"));
  trans.push(transitions("userFindByUserForm"));
  
  doc = {code:200, doc:{actions:trans}};
  respond(req, res, doc);
}

function addItem(req, res, respond) {
  var body, doc, msg, list, ctype;

  ctype = '';
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
    
      msg = validateAddItem(msg);
      if(msg.type==='error') {
        doc = utils.errorResponse(req, res, msg.message, msg.code);
      }
      else {
        list = components.user('add', msg, msg.userName);
        if(list.type==="error") {
          doc = utils.errorResponse(req, res, 'Server Error', 500, list.messsage);
        }
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
}
function validateAddItem(msg) {
  var doc;

  // required properties
  if(!msg.userName) {
    doc = utils.exception("User", "Missing [userName] property", 400);
    return doc;
  }

  if(!msg.password) {
    doc = utils.exception("User", "Missing [password] property", 400);
    return doc;
  }
  
  // set property defaults
  if(!msg.familyName) {
    msg.familyName='';
  }
  if(!msg.givenName) {
    msg.givenName='';
  }
  if(!msg.webUrl) {
    msg.webUrl='';
  }
  if(!msg.avatarUrl) {
    msg.avatarUrl='';
  }
  
  return msg;
}

function updateItem(req, res, id, respond) {
  var body, list, msg, doc, ctype;

  ctype = '';
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
    
      msg = validateUpdateItem(msg);
      
      if(!id || id===null) {
        id = msg.id;
      }
      if(msg.type==='error') {
        doc = utils.errorResponse(req, res, msg.message, msg.code);
      }
      else {
        list = components.user('update', id, msg, true);
        if(list.type==="error") {
          doc = utils.errorResponse(req, res, 'Server Error', 500, list.messsage);
        }
      }
    }
    catch(ex) {
      doc = utils.errorResponse(req, res, 'Server Error', 500);
    }
    
    if(!doc) {
      sendItem(req, res, id, respond);
    }
    else {
      respond(req, res, doc);
    }
  });
}
function validateUpdateItem(msg) {
  var doc;
  
  // compose change item
  doc = {};
  if(msg.id) {
    doc.id = msg.id;
  }
  if(msg.familyName) {
    doc.familyName = msg.familyName;
  }
  if(msg.givenName) {
    doc.givenName = msg.givenName;
  }
  if(msg.webUrl) {
    doc.webUrl = msg.webUrl;
  }
  if(msg.avatarUrl) {
    doc.avatarUrl = msg.avatarUrl;
  }
  
  return doc;
}

function changePW(req, res, respond) {
    var body, doc, msg, list, ctype;

  ctype = '';
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
    
      msg = validateChangePW(msg);
      if(msg.type==='error') {
        doc = utils.errorResponse(req, res, msg.message, msg.code);
      }
      else {
        var item = {};
        item.password = msg.newPass;
        list = components.user('update', msg.id, item);
      }
    }
    catch(ex) {
      doc = utils.errorResponse(req, res, 'Server Error', 500);
    }
    
    if(!doc) {
      sendItem(req, res, msg.userName, respond);
    }
    else {
      respond(req, res, doc);
    }
  });
}
function validateChangePW(msg) {
  var doc, item;

  // required properties
  if(!msg.id) {
    doc = utils.exception("User", "Missing [userName] property", 400);
    return doc;
  }

  if(!msg.oldPass) {
    doc = utils.exception("User", "Missing [oldPass] property", 400);
    return doc;
  }

  if(!msg.newPass) {
    doc = utils.exception("User", "Missing [newPass] property", 400);
    return doc;
  }

  if(!msg.checkPass) {
    doc = utils.exception("User", "Missing [passCheck] property", 400);
    return doc;
  }
  
  // validate consistency
  if(msg.checkPass!==msg.newPass) {
    doc = utils.exception("User", "The [newPass] and [passCheck] properties do not match", 400);
    return doc;
  }
  
  // check against existing pass
  item = components.user('read', msg.id);
  if(!item[0]) {
    doc = utils.exception("User", "Invalid [userName] property", 400);
    return doc;
  }
  
  if(item[0].password!==msg.oldPass) {
    doc = utils.exception("User", "Invalid [oldPass] property", 400);
    return doc;
  }
  
  return msg;
}

// EOF













