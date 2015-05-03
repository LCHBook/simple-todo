/**************************************************************
 * big-todo
 * SPA Client for JSON Object Provider (JS)
 * January 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Charlie Haden, Jim Hall "Montreal Jazz Festival" **************************************************************/
 
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
  g.urls.taskFindByTitle = "/task/bytitle/"; //?q={q}";
  g.urls.taskFindByCategory = "/task/bycategory/"; //?q={q}";
  g.urls.taskFindByComplete = "/task/bycomplete/"; //?q={q}";

  g.urls.categoryAdd = "/category/";
  g.urls.categoryItem = "/category/{id}";
  g.urls.categoryCollection = "/category/";
  g.urls.categoryFindByName = "/category/byname/"; //?q={q}";

  g.urls.userAdd = "/user/";  
  g.urls.userItem = "/user/{id}";
  g.urls.userUpdate = "/user/{id}";
  g.urls.userChangePW = "/user/changepw/";
  g.urls.userCollection = "/user/";
  g.urls.userFindByName = "/user/byname/"; //?fn={fn}&gn={gn}";
  g.urls.userFindByUser = "/user/byuser/"; //?q={q}";
  
  // fields to display
  g.fields = {}
  g.fields.task = "title description category dateDue completeFlag userName actions";
  g.fields.category = "name";
  g.fields.user = "userName familyName givenName webUrl avatarUrl actions";
  
  // match urls to dialogs
  g.dialogs = { 
    "task-add" : g.urls.taksAddItem, 
    "task-complete" : g.urls.taskComplete,
    "task-assign" : g.urls.taskAssignUser,
    "task-findbycategory" : g.urls.taskFindByCategory, 
    "task-findbytitle" : g.urls.taskFindByTitle,
    "task-findbycomplete" : g.urls.taskFindByComplete,
    "category-add" : g.urls.categoryAdd,
    "category-findbyname" : g.urls.categoryFindByName,
    "user-add" : g.urls.userAdd,
    "user-update" : g.urls.userUpdate,
    "user-changepw" : g.urls.userChangePW,
    "user-findbyname" : g.urls.userFindByName,
    "user-findbyuser" :g.urls.userFindByUser
  };
  
  // action descriptions
  g.itemActions = {
    "task" : [
      {title : "Mark Complete", href : g.urls.taskComplete, rel : "http://example.com/mark-complete"},
      {title : "Assign User", href : g.urls.taskAssignUser, rel : "http://example.com/rels/assign-user"}
    ],
    "category" : [],
    "user" : [
      {title : "Change Password", href : g.urls.userChangePW, rel : "http://example.com/rels/change-password"},
      {title : "Update User", href : g.urls.userUpdate, rel : "edit"}
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
      {title : "Find by Title", href : g.urls.taskFindByTitle, rel : "search", className : "task-bytitle"},
      {title : "Find by Category", href : g.urls.taskFindByCategory, rel : "search", className : "task-bycategory"},
      {title : "Find by Complete Status", href : g.urls.taskFindByComplete, rel : "search", className : "task-bycomplete"}
    ],
    "category" : [
      {title : "Home", href : g.urls.home, rel : "self", className : "page"},
      {title : "Categories", href : g.urls.categoryCollection, rel : "collection", className : "category"},
      {title : "Add Category", href : g.urls.categoryAdd, rel : "create-form", className : "category-add"},
      {title : "Find by Name", href : g.urls.categoryFindByName, rel : "search", className : "category-byname"}
    ],
    "user" : [
      {title : "Home", href : g.urls.home, rel : "self", className : "page"},
      {title : "Users", href : g.urls.userCollection, rel : "collection", className : "user"},
      {title : "Add User", href : g.urls.userAdd, rel : "create-form", className : "user-add"},
      {title : "Find by User Name", href : g.urls.taskFindByUser, rel : "search", className : "user-byuser"},
      {title : "Find by Name", href : g.urls.taskFindByName, rel : "search", className : "user-byname"}
    ]
  };
  
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
  function taskItem() {}
  function taskAdd() {}
  function taskFindByCategory() {}
  function taskFindByTitle() {}
  function taskFindByCompelete() {}
  function taskMarkComplete() {}
  function taskAssigneUser() {}
  
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
  function categoryItem() {}
  function categoryAdd() {}
  function categoryFindByName() {}
  
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
  function userItem() {}
  function userFindByUserName() {}
  function userFindByName() {}
  function userChangePassword() {}
  function userUpdate() {}
  
  // specific UI services
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
  function handleLinkAction(e) {
    var link;
    
    link = e.target;
    switch (link.className) {
      case "page":
        showListActions("page");
        break;
      case "task":
        taskCollection();
        break;
      case "category" :
        categoryCollection();
        break;
      case "user" :
        userCollection();
        break;
      default:
        alert("*** ERROR: unknown link action " + link.className);
        break;
    }
    return false;
  }
  function showData(context) {
    var actions, idLink, elm, rows, flds;
    var tbl, tr, th, td, z, handler;

    elm = dom.find("data");
    dom.clear(elm);
    
    // set context data
    switch(context) {
      case "task-list":
        actions = g.itemActions.task;
        url = g.urls.taskItem;
        rows = g.rsp.task;
        flds = g.fields.task.split(" "); 
        handler = taskItem;
        break;
      case "category-list":
        actions = g.itemActions.category;
        url = g.urls.categoryItem;
        rows = g.rsp.category;
        flds = g.fields.category.split(" "); 
        handler = categoryItem;
        break;
      case "user-list":
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
            a.className = "action";
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
  that.tagNodes = tagNodes;
  that.find = find;
  that.text = text;
  that.node = node;
  that.clear = clear;
  that.classNodes = classNodes;

  return that;
}

