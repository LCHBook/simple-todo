/*******************************************************
 * big-todo
 * Representation Service for HTML
 * January 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : The Definitive Sonny Rollins 
                On Prestige, Riverside, And Contemporary
 *******************************************************/

var transitions = require('./../transitions.js');

module.exports = html;

// need to include forms and links here
function html(object, root) {
  var doc, docStart, docEnd, sectionStart, sectionEnd, s;
  
  // templates
  docStart = '<html><head>'
  docStart += '<title>{title}</title>'
  docStart += '<link rel="stylesheet" href="'+root+'/files/html.css" />'
  docStart += '</head><body>';
  sectionStart = "<h1>{section}</h1><div>";
  sectionEnd = "</div>";
  docEnd = "</body></html>";
  
  doc = "";
  doc += docStart;
  
  // handle sections
  s="";
  for(s in object) {
    doc += sectionStart.replace("{section}",s);
    doc = doc.replace("{title}",s);
    
    switch(s) {
      case "home":
        doc += processHome(object[s], root);
        break;
      case "task":
        doc += processTasks(object[s], root, s);
        break;
      case "category":
        doc += processCategory(object[s], root, s);
        break;
      case "user":
        doc += processUser(object[s], root, s);
        break;
      case "actions":
        doc += processActions(object[s], root, s);
        break;
      case "error":
        doc += processError(object[s], root);
        break;
      default:
        doc += "<pre>"+JSON.stringify(object, null, 2)+"<pre>";
        break;
    }
    doc += sectionEnd;
  }
  doc += docEnd;
  
  return doc;
}

function processHome(data, root) {
  var rtn, coll;
 
  rtn = "";
  if(data.actions) {
    rtn += getActions(data.actions, root, "list");
  }

  return rtn;

}

function processTasks(data, root, s) {
  var rtn, fields, itemActions;
 
  fields = ["title","description","category","dateDue","completeFlag","user"];
  if(data.actions) {
    itemActions = getActions(data.actions, root, "item");
  }

  rtn = "";
  
  // links
  if(data.actions) {
    rtn += getActions(data.actions, root, "list");
  }
    
  // data 
  if(data.data && Array.isArray(data.data)) {
    rtn += makeTable(data.data, s, root, fields, itemActions);
  }
   
  return rtn;
}

function processCategory(data, root, s) {
  var rtn, fields, itemActions;
 
  fields = ["name"];
  if(data.actions) {
    itemActions = getActions(data.actions, root, "item");
  }

  rtn = "";
  
  if(data.actions) {
    rtn += getActions(data.actions, root, "list");
  }

  // data  
  if(data.data && Array.isArray(data.data)) {
    rtn += makeTable(data.data, s, root, fields, itemActions);
  }

  return rtn;
}

function processUser(data, root, s) {
  var rtn, field, itemActions;
 
  fields = ["userName", "familyName", "givenName", "webUrl", "avatarUrl"];
  itemActions = getActions(data.actions, root, "item");

  rtn = "";

  if(data.actions && Array.isArray(data.actions)) {
    rtn += getActions(data.actions, root, "list");
  }
  
  // data
  if(data.data && Array.isArray(data.data)) {
    rtn += makeTable(data.data, s, root, fields, itemActions);
  }
 
  return rtn;
}

// handle action-only responses
function processActions(data, root, s) {
  var rtn;
  
  rtn = "";
  
  rtn += getActions(data, root, "list");
  rtn += formActions(data, root);
  
  return rtn;
}

function processError(data) {
  var rtn;
  
  rtn = "";
  rtn += "<dl>";
  
  for(p in data) {
    rtn += "<dt>"+p+"</dt>";
    rtn += "<dd>"+data[p]+"</dd>";
  }  
  rtn += "</dl>";
  
  return rtn;
}

function formActions(coll, root) {
  var rtn, href, doc, coll;
  
  rtn = "";
   
  for(i=0,x=coll.length;i<x;i++) {
    if(coll[i].inputs) {
      rtn += '<form action="{root}/{kind}/{key}" method="{method}">';
      rtn += '<fieldset><legend>{prompt}</legend>';
      rtn = rtn.replace(/{prompt}/g, coll[i].prompt);
      for(j=0, y=coll[i].inputs.length; j<y; j++) {
        rtn += '<p><label>{prompt}</label>'
        rtn += '<input name="{name}" value="{value}" {ro}/></p>'
        rtn = rtn.replace(/{prompt}/g, coll[i].inputs[j].prompt);
        rtn = rtn.replace(/{name}/g, coll[i].inputs[j].name);
        rtn = rtn.replace(/{value}/g, (coll[i].inputs[j].value||''));
        rtn = rtn.replace(/{ro}/g, (coll[i].inputs[j].name==='id'?'readonly="true"':""));
      }
      rtn += '<p><label>&nbsp;</label><input type="submit" /></p>';
      rtn += '</fieldset></form>';
    }
    rtn = rtn.replace("{root}", root);
    rtn = rtn.replace("{kind}", coll[i].kind);
    rtn = rtn.replace("{key}", (coll[i].key===""?coll[i].key:coll[i].key+"/"));
    rtn = rtn.replace("{method}", (coll[i].type==="unsafe"?"post":"get"));
  }
  
  return rtn;
}

function makeTable(data, type, root, fields, actions) {
  var rtn, rows, i, x, j, y;
  
  rtn = "";
  rtn += "<table>";
  
  // header row
  rtn += "<tr>";
  for(i=0, x=fields.length; i<x; i++) {
    rtn += "<th>"+fields[i]+"</th>";
  }
  rtn += "</tr>";
    
  // get rows to process
  rows = data;
    
  for(i=0, x=rows.length; i<x; i++) {
    z=0;
    rtn += '<tr>';
    // show the requested fields in order
    for(j=0, y=fields.length; j<y; j++) {
      rtn += '<td>'; 
      for(var p in rows[i]) {
        if(p===fields[j]) {
          // first column will be tagged for with a link
          if(z++===0 && rows[i].id) {
            rtn += '<a href="{root}/{type}/{key}">{prompt}</a>'
            rtn = rtn.replace("{root}" , root);
            rtn = rtn.replace("{type}" , type);
            rtn = rtn.replace("{key}" , rows[i].id);
            rtn = rtn.replace("{prompt}" , rows[i][p]);
          }
          else {
            rtn += rows[i][p];
          }
          break;
        }
        else {
          rtn += '&nbsp;';
        }
      }
      rtn += '</td>';
    }
    
    // handle actions
    if(actions!=="<ul></ul>") {
      rtn += "<td>" + actions.replace(/{id}/g,data[i].id); + "</td>";
    }
    rtn += '</tr>';
  }
  rtn += '</table>';
  
  return rtn;
}

function getActions(coll, root, target) {
  var rtn, i, x, t;
  
  t = (target||"list");
  
  rtn = "";
  rtn += "<ul>";
  
  for(i=0,x=coll.length;i<x;i++) {
    switch(coll[i].type) {
      case "safe": { 
        if(!coll[i].inputs && coll[i].target===t) {
          rtn += "<li>";
          rtn += '<a href="{root}/{kind}/{key}/">{prompt}</a>';
          rtn += '</li>';
          
          rtn = rtn.replace(/{root}/g, root);
          rtn = rtn.replace(/{prompt}/g, coll[i].prompt);
          rtn = rtn.replace(/{kind}/g, coll[i].kind);
          
          switch(coll[i].name) {
            case "homeLink":
              rtn =  rtn.replace("/home/{key}/","");
              break;
            case "taskCollectionLink":
            case "categoryCollectionLink":
            case "userCollectionLink":
              rtn = rtn.replace("/{key}/","/");
              break;
            case "taskItemLink":
            case "categoryItemLink":
            case "userItemLink":
            case "taskAddLink":
            case "categoryAddLink":
            case "userAddLink":
              rtn = rtn.replace("{key}/",coll[i].key);
              break;
            case "taskCompleteLink":
            case "taskAssignUserLink":
            case "userChangePWLink":
            case "userUpdateLink":
              rtn = rtn.replace("{key}/",coll[i].key+"/{id}");
              break;
            case "taskFindByTitleLink":
            case "taskFindByCategoryLink":
            case "taskFindByCompleteLink":
            case "categoryFindByNameLink":
            case "userFindByNameLink":
            case "userFindByUserLink":
              rtn = rtn.replace("{key}",coll[i].key);
              break;
          }
        }
      }
    }
  }
  
  rtn += "</ul>";
  
  return rtn;
}

