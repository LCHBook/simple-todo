/*******************************************************
 * big-todo
 * Representation Service handler
 * January 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : The Definitive Sonny Rollins 
                On Prestige, Riverside, And Contemporary
 *******************************************************/

// load representors
var json = require('./representors/json.js');
var html = require('./representors/html.js');
var halj = require('./representors/hal-json.js');

module.exports = processDoc;

// process object tree based on mime requested
function processDoc(object, mimeType, root) {
  var doc;

  // clueless? assume HTML
  if(!mimeType) {
    mimeType="text/html";
  }

  // dispatch to requested representor  
  switch(mimeType.toLowerCase()) {
    case "application/json":
      doc = json(object, root);
      break;
    case "application/hal+json":
      doc = halj(object, root);
      break;
    case "text/html":
    case "application/html":
    default:
      doc = html(object, root);
      break;
  }

  return doc;
}

// EOF



