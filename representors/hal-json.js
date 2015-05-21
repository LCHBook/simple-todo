/*******************************************************
 * big-todo
 * Representation Service for plain JSON
 * May 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Complete Collection : BB King 2008
 *******************************************************/

// hal-json representor
module.exports = haljson;

function haljson(object, root) {
  var hal;
  
  hal = {};
  hal = _links = {};
  
  root = "http:"+root;
  
  for(s in object) {
    hal._links = getLinks(object[s], root, s);
    if(object[s].data && object[s].data.length===1) {
      hal = getProperties(hal, object[s], root, s);
    }
  }
       
  return JSON.stringify(hal, null, 2); 
}

function getLinks(object, root,s) {
  var rtn, coll, links, i, x, curies, kind, rel, url, inputs, temp;
  
  console.log(JSON.stringify(object,null,2));
  
  rtn = {};
  curies = root+"/files/hal-docs.html#{rel}";

  links = {};
  links.self = {href:root+'/'+s+'/'};
  links.profile = {href:root+'/big-todo-alps.json'};
  
  // handle list-level actions
  if(object.actions) {
    coll = object.actions;
    for(i=0,x=coll.length;i<x;i++) {
      if(coll[i].target === "list") {
        if(coll[i].name.indexOf("AddLink")==-1) {
          if(coll[i].kind==="home") {
            kind = "";
          }
          else {
            kind = coll[i].kind+"/";
          }
          rel = coll[i].name.replace("Link","").replace("Form","").toLowerCase();
          url = root+'/'+kind
          temp = false;
          if(coll[i].inputs && coll[i].type==="safe") {
            temp = true;
            inputs = coll[i].inputs;
            for(j=0,y=inputs.length;j<y;j++) {
              if(j===0) {
                url += '{?';
              }
              else {
                url+=',';
              }
              url += inputs[j].name;
              if(j===y-1) {
                url += '}';
              }
            }
          }
          links[curies.replace("{rel}",rel)] = {href:url, title:coll[i].prompt, templated:temp};
        }
      }
    }
    
    // handle list-level data
    coll = object.data;
    if(coll && coll.length>1) {
      items = [];
      for(i=0,x=coll.length;i<x;i++) {
        item = {};
        item.href = root+'/'+kind+coll[i].id;
        switch(s) {
          case "task":
            item.title = coll[i].title;
            break;
          case "category":
            item.title = coll[i].name;
            break;
          case "user":
            item.title = coll[i].userName;
            break;
        }
        items.push(item);
      }
      links[curies.replace("{rel}",s.toLowerCase())] = items;
    }
    rtn = links;
  }
  return rtn;
}

function getProperties(hal, object, root, s) {
  var rtn, props, links, curies, id;
  
  rtn = hal;
  curies = root+"/files/hal-docs.html#{rel}";
  
  if(object.data) {
    props = object.data[0];
    id = object.data[0].id;
    for(var p in props) {
      rtn[p] = props[p];
    }
  }
  
  if(object.actions) {
    links = object.actions;
    for(j=0,y=links.length;j<y;j++) {
      if(links[j].target==="item" && links[j].type==="unsafe") {
        rtn._links[curies.replace("{rel}",links[j].name.replace("Link","").replace("Form","").toLowerCase())] = {href:root+'/'+links[j].kind+'/'+links[j].key+'/'+id, title:links[j].prompt};
      }
    }
  }

  // fix up self link for this representation
  rtn._links.self = {href:root+'/'+s+'/'+id};
  
  return rtn; 
}

