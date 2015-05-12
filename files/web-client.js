/**************************************************************
 * big-todo
 * SPA Client for JSON Object Provider (JS)
 * January 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Charlie Haden, Jim Hall "Montreal Jazz Festival" 
 **************************************************************/
 
 var pg;
 
 window.onload = function() {
  pg = thisPage();
  pg.init();
 }
 
 // all work done here
 function thisPage() {

  var dom = domHelp();
  
  var g = {};  
  g.root = location.origin;
  g.rsp = {};
    
  // memorize all the urls
  g.urls = {};
  g.urls.home = "/";
  g.urls.taskAdd = "/task/";
  g.urls.taskItem = "/task/{id}";
  g.urls.taskComplete = "/task/complete/";
  g.urls.taskCollection = "/task/";
  g.urls.taskAssignUser = "/task/assign/";
  g.urls.taskByTitle = "/task/bytitle/?q={q}";
  g.urls.taskByCategory = "/task/bycategory?q={q}";
  g.urls.taskByComplete = "/task/bycomplete?q={q}";

  g.urls.categoryAdd = "/category/";
  g.urls.categoryItem = "/category/{id}";
  g.urls.categoryCollection = "/category/";
  g.urls.categoryByName = "/category/byname/?q={q}";

  g.urls.userAdd = "/user/";  
  g.urls.userItem = "/user/{id}";
  g.urls.userUpdate = "/user/{id}";
  g.urls.userChangePW = "/user/changepw/";
  g.urls.userCollection = "/user/";
  g.urls.userByName = "/user/byname/?fn={fn}&gn={gn}";
  g.urls.userByUser = "/user/byuser/?q={q}";
  
  // action descriptions
  g.itemActions = {
    "task" : [
      {title : "Mark Complete", href : g.urls.taskComplete, rel : "http://example.com/mark-complete", className : "task-complete"},
      {title : "Assign User", href : g.urls.taskAssignUser, rel : "http://example.com/rels/assign-user", className : "task-assign"}
    ],
    "category" : [],
    "user" : [
      {title : "Change Password", href : g.urls.userChangePW, rel : "http://example.com/rels/change-password", className : "user-changepw"},
      {title : "Update User", href : g.urls.userUpdate, rel : "edit", className : "user-update"}
   ]
  };
  
  g.listActions = {
    "page" : [
      {title : "Tasks", href : g.urls.taskCollection, rel : "collection", className : "task"},
      {title : "Categories", href : g.urls.taskCollection, rel : "collection", className : "category"},
      {title : "Users", href : g.urls.taskCollection, rel : "collection", className : "user"}      
    ],
    "task" : [
      {title : "Home", href : g.urls.home, rel : "self", className : "page"},
      {title : "Tasks", href : g.urls.taskCollection, rel : "collection", className : "task"},
      {title : "Add Task", href : g.urls.taskAdd, rel : "create-form", className : "task-add"},
      {title : "Find by Title", href : g.urls.taskByTitle, rel : "search", className : "task-bytitle"},
      {title : "Find by Category", href : g.urls.taskByCategory, rel : "search", className : "task-bycategory"},
      {title : "Find by Complete Status", href : g.urls.taskByComplete, rel : "search", className : "task-bycomplete"}
    ],
    "category" : [
      {title : "Home", href : g.urls.home, rel : "self", className : "page"},
      {title : "Categories", href : g.urls.categoryCollection, rel : "collection", className : "category"},
      {title : "Add Category", href : g.urls.categoryAdd, rel : "create-form", className : "category-add"},
      {title : "Find by Name", href : g.urls.categoryByName, rel : "search", className : "category-byname"}
    ],
    "user" : [
      {title : "Home", href : g.urls.home, rel : "self", className : "page"},
      {title : "Users", href : g.urls.userCollection, rel : "collection", className : "user"},
      {title : "Add User", href : g.urls.userAdd, rel : "create-form", className : "user-add"},
      {title : "Find by User Name", href : g.urls.userByUser, rel : "search", className : "user-byuser"},
      {title : "Find by Name", href : g.urls.userByName, rel : "search", className : "user-byname"}
    ]
  };

  // fields to display
  g.fields = {}
  g.fields.task = "title description category dateDue completeFlag userName actions";
  g.fields.category = "name";
  g.fields.user = "userName familyName givenName webUrl avatarUrl actions";
    
  
  function init() {
    showListActions("page");
  }
  
  // task operations
  function taskCollection() {
    var elm;

    showListActions("task");    
    elm = dom.find("data");
    if(elm) {
      dom.clear(elm);
      makeRequest(g.urls.taskCollection,"get",null,"task-list",showData);
    }
  }
  function taskItem(href) {
    var elm;

    showListActions("task");    
    elm = dom.find("data");
    if(elm) {
      dom.clear(elm);
      makeRequest(href,"get",null,"task-item",showData);
    }
    return false;
  }
  function taskAdd(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  function taskByTitle(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  function taskByCategory(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  function taskByComplete(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  function taskMarkComplete(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  function taskAssignUser(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  
  // category operations
  function categoryCollection() {
    var elm;

    showListActions("category");    
    elm = dom.find("data");
    if(elm) {
      dom.clear(elm);
      makeRequest(g.urls.categoryCollection,"get",null,"category-list",showData);
    }
  }
  function categoryItem(href) {
    var elm;

    showListActions("category");    
    elm = dom.find("data");
    if(elm) {
      dom.clear(elm);
      makeRequest(href,"get",null,"category-item",showData);
    }
  }
  function categoryAdd(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  function categoryByName(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  
  // user operations
  function userCollection() {
    var elm;

    showListActions("user");    
    elm = dom.find("data");
    if(elm) {
      dom.clear(elm);
      makeRequest(g.urls.userCollection,"get",null,"user-list",showData);
    }
  }
  function userItem(href) {
    var elm;

    showListActions("user");    
    elm = dom.find("data");
    if(elm) {
      dom.clear(elm);
      makeRequest(href,"get",null,"user-item",showData);
    }
  }
  function userAdd(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  function userByUser(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  function userByName(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  function userChangePW(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  function userUpdate(e) {
    var elm;
    
    elm = e.target;
    alert(elm.id);
    return false;
  }
  
  // specific UI services
  function handleLinkAction(e) {
    var link, cls, rowId;
    
    link = e.target;
    rowId = link.parentNode.parentNode.id;
    cls = link.className.split(" ")[0]
    
    switch (cls) {
      case "page":
        showListActions("page");
        break;
      case "task":
        taskCollection();
        break;
      case "task-add":
        showDialog(cls, "task", taskAdd);
        break;
      case "task-bytitle":
        showDialog(cls, "task", taskByTitle);
        break;      
      case "task-bycategory":
        showDialog(cls, "task", taskByCategory);
        break;      
      case "task-bycomplete":
        showDialog(cls, "task", taskByComplete);
        break;      
      case "task-complete":
        showDialog(cls, "task", taskMarkComplete, [{name:"id", value:rowId}]);
        break;      
      case "task-assign":
        showDialog(cls, "task", taskAssignUser, [{name:"id", value:rowId}]);
        break;      
      case "category" :
        categoryCollection();
        break;
      case "category-add":
        showDialog(cls, "category", categoryAdd);
        break;
      case "category-byname":
        showDialog(cls, "category", categoryByName);
        break;
      case "user" :
        userCollection();
        break;
      case "user-add":
        showDialog(cls, "user", userAdd);
        break;
      case "user-changepw":
        showDialog(cls, "user", userChangePW, [{name:"userName", value:rowId}]);
        break;
      case "user-update":
        showDialog(cls, "user", userUpdate, [{name:"userName", value:rowId}]);
        break;
      case "user-byname":
        showDialog(cls, "user", userByName);
        break;
      case "user-byuser":
        showDialog(cls, "user", userByUser);
        break;
      default:
        alert("*** ERROR: unknown link action " + cls);
        break;
    }
    return false;
  }
  function showListActions(group) {
    var elm, ul, li, a;
    
    hideBlocks();
    elm = dom.find("list-actions");
    if(elm) {
      dom.clear(elm);
      ul = dom.node("ul");
      for(var link of g.listActions[group]) {
        li = dom.node("li");
        a = dom.node("a");
        a.href = link.href;
        a.title = link.title;
        a.rel = link.rel;
        a.className = link.className;
        a.onclick = handleLinkAction;
        dom.push(dom.text(link.title),a);
        dom.push(a,li);
        dom.push(li,ul);
      }
      dom.push(ul,elm); 
    }
    showBlock(elm.id);  
  }
  function showDialog(id, group, handler, data) {
    var elm;
    
    hideBlocks();
    showListActions(group);
    setForm(id, handler, data);
    showBlock(id); 
  }
  function showData(context) {
    var actions, url, elm, rows, flds;
    var tbl, tr, th, td, z, handler;

    elm = dom.find("data");
    dom.clear(elm);
    
    // set context data
    switch(context) {
      case "task-list":
      case "task-item":
        actions = g.itemActions.task;
        url = g.urls.taskItem;
        rows = g.rsp.task;
        flds = g.fields.task.split(" "); 
        handler = taskItem;
        break;
      case "category-list":
      case "category-item":
        actions = g.itemActions.category;
        url = g.urls.categoryItem;
        rows = g.rsp.category;
        flds = g.fields.category.split(" "); 
        handler = categoryItem;
        break;
      case "user-list":
      case "user-item":
        actions = g.itemActions.user;
        url = g.urls.userItem;
        rows = g.rsp.user;
        flds = g.fields.user.split(" "); 
        handler = userItem;
        break;
      default:
        alert("*** ERROR: unknown context in ShowData: "+context);
        break;
    }
    
    // display service data
    tbl = dom.node('table');
    
    // header row
    tr = dom.node('tr');
    for(var fld of flds) {
      th = dom.node('th');
      th.innerText = fld;
      dom.push(th,tr);
    }
    dom.push(tr,tbl);
        
    for(var row of rows) {
      z=0;
      tr = dom.node('tr');
      for(var fld of flds) {
        td = dom.node('td');
        if(fld==="actions" && actions!==null) {
          for(var ac of actions) {
            a = dom.node("a");
            a.href = ac.href;
            a.title = ac.title;
            a.rel = ac.rel;
            a.className = ac.className+ " action";
            dom.push(dom.text(ac.title),a);
            a.onclick = handleLinkAction;
            dom.push(a,td);
          }
          dom.push(td,tr);
          break;
        }
        
        for(var p in row) {
          if(p===fld) {
            if(z++===0 && row.id) {
              a = dom.node('a');
              a.href = url.replace('{id}',row.id);
              dom.push(dom.text(row[p]),a);
              a.onclick = function() {handler(this.href); return false;};
              tr.id = row.id; //stuff unique record id into table row
              dom.push(a,td);
            }
            else {
              td.innerText = row[p];
            }
            break;
          }
          else {
            td.innerText = '';
          }
        }
        dom.push(td,tr);
      }
      dom.push(tr,tbl);
    }
    dom.push(tbl,elm);
    showBlock(elm.id);    
  }
  
  // generic UI services
  function hideBlocks() {
    var nodes, i, x;
    
    nodes = dom.classNodes("block");
    for(i=0,x=nodes.length;i<x;i++) {
      nodes[i].style.display="none";
    }
  } 
  function showBlock(id) {
    var elm;
    
    elm = dom.find(id);
    if(elm) {
      elm.style.display="block";
    }
  }  
  function setForm(id, handler, data) {
    var elm, nodes, d;
    
    elm = dom.find(id);
    if(elm) {
      elm.onsubmit = handler;
    }
    if(data) {
      for(var d of data) {
        nodes = dom.nameNodes(d.name, elm, "input");
        if(nodes[0]) {
          nodes[0].value = d.value;
        }
        else {
          if(nodes) {
            nodes.value = d.value;
          }
        }
      }
    }
  }
  
  // handle network request/response
  function makeRequest(href, method, body, context, handler) {
    var ajax;

    ajax=new XMLHttpRequest();
    if(ajax) {

      ajax.onreadystatechange = function(){processResponse(ajax, context, handler);};

      if(body) {
        ajax.open(method,href);
        ajax.send(body);
      }
      else {
        ajax.open(method,href);
        ajax.setRequestHeader("Accept","application/json");
        ajax.send(null);
      }
    }
  }
  function processResponse(ajax, context, handler) {

    if(ajax.readyState==4 || ajax.readyState==='complete') {
      if(ajax.status===200 || ajax.status===204) {
        if(handler) {
          g.rsp = JSON.parse(ajax.responseText);
          handler(context);
        }
        else {
          alert('*** ERROR: missing handler for '+context);
        }
      }
      else {
        alert('*** ERROR: '+ajax.status+'\n'+ajax.statusText);
      }
    }
  }
    
  // publish interface
  var that = {};
  that.init = init;
  
  return that;
 }
 
// **************************
// DOM helpers
// **************************
function domHelp() {

  function push(source,target) {
    target.appendChild(source);
  }

  function nameNodes(name,elm,tag) {
    var nodes,i,x;
    if(elm && tag) {
      nodes = elm.getElementsByTagName(tag);
      for(i=0,x=nodes.length;i<x;i++) {
        if(nodes[i].name===name) {
          rtn = nodes[i];
          break;
        }
      }
    }
    else {
      rtn = document.getElementsByName(name);
    }
    return rtn;
  }
  
  function classNodes(name,elm) {
    if(elm) {
      rtn = elm.getElementsByClasName(name);
    }
    else {
      rtn = document.getElementsByClassName(name);
    }
    return rtn;
  }
  
  function tagNodes(tag,elm) {
    if(elm) {
      rtn = elm.getElementsByTagName(tag);
    }
    else {
      rtn = document.getElementsByTagName(tag);
    }
    return rtn;
  }

  function find(id) {
    return document.getElementById(id);
  }

  function text(txt) {
    return document.createTextNode(txt);
  }

  function node(type) {
    return document.createElement(type);
  }

  function clear(elm) {
    while (elm.firstChild) {
      elm.removeChild(elm.firstChild);
    }
  }

  // publish
  that = {};
  that.push = push;
  that.find = find;
  that.text = text;
  that.node = node;
  that.clear = clear;
  that.tagNodes = tagNodes;
  that.nameNodes = nameNodes;
  that.classNodes = classNodes;

  return that;
}

